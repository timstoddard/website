import { get, set } from '../start/Utils'
import { noop } from '../types'
import { colorFromXy, makeCGPoint, UIColor } from './hue-color-conversion'
import { LightData, Lights } from './Light'

export class HueApi {
  private apiUrl: string
  private lights: Lights = {}
  private groups: any = {} // TODO type
  private scenes: any = {} // TODO type
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  private fetchAbortController: AbortController
  private fetchAbortTimeout: number

  init = async (): Promise<void> => { // TODO rename?
    // TODO make get()/set() shared util functions for the app (not just in /start)

    // get hue api url
    let hueUrl = get('hueUrl') as string
    if (!hueUrl) {
      hueUrl = prompt('Please enter the hue url.')
      set('hueUrl', hueUrl)
    }

    // get hue user id
    let hueUserId = get('hueUserId') as string
    if (!hueUserId) {
      hueUserId = prompt('Please enter the hue user id.')
      set('hueUserId', hueUserId)
    }

    // generate api url
    this.apiUrl = (hueUrl && hueUserId)
      ? `http://${hueUrl}/api/${hueUserId}`
      : null

    // load light data from api
    await this.fetchLights()
    await this.fetchGroups() // TODO remove?
    await this.fetchScenes() // TODO remove?
  }

  /* GETTERS */

  getLights = (): Lights => {
    return this.lights
  }

  getLight = (lightId: number): LightData => {
    return this.lights[lightId]
  }

  getLightIds = (): number[] => {
    // TODO sort by name not id
    return this.convertObjectKeysToSortedNumberList(this.lights)
  }

  getGroups = (): any => {
    return this.groups
  }

  getGroup = (groupId: number): any => {
    return this.groups[groupId]
  }

  getGroupIds = (): number[] => {
    // TODO sort by name not id
    return this.convertObjectKeysToSortedNumberList(this.groups)
  }

  getLightIdsInGroup = (groupId: number): number[] => {
    // TODO sort by name not id
    const selectedGroup = this.getGroup(groupId)
    return selectedGroup
      ? selectedGroup.lights.map(stringToInt)
      : []
  }

  getScenes = (): any => {
    return this.scenes
  }

  getScene = (sceneId: string): any => {
    return this.scenes[sceneId]
  }

  getSceneIds = (): string[] => {
    const list = []
    for (const sceneId in this.scenes) {
      list.push(Object.assign({}, this.scenes[sceneId], { sceneId }))
    }
    // sort by scene name, then return ids only
    list.sort((a: ({ name: string }), b: ({ name: string })) => {
      if (!a) {
        return -1
      } else if (!b) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        // a.name === b.name
        return 0
      }
    })
    return list.map((n: any) => n.sceneId)
  }

  private convertObjectKeysToSortedNumberList = (dict: { [key: string]: any }): number[] => {
    const list = Object.keys(dict).map(stringToInt)
    list.sort((a: number, b: number) => a - b)
    return list
  }

  /* SETTERS */

  updateLightState = async (
    lightId: number | string,
    body: unknown,
    transitionTime = 0,
  ): Promise<void> => {
    if (!this.apiUrl) {
      return
    }

    const url = `${this.apiUrl}/lights/${lightId}/state`
    await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(Object.assign({}, body, {
        transitiontime: transitionTime,
      })),
    })
  }

  updateGroupState = async (
    groupId: number,
    body: unknown,
    transitionTime = 0,
  ): Promise<void> => {
    if (!this.apiUrl) {
      return
    }

    /* // TODO this fails for repeated quick changes (builds up a queue of states to change to, and must cycle through all).
    // this has been "fixed" via throttling & the working code
    // TODO add option to switch between the 2 impls
    const url = `${this.apiUrl}/groups/${groupId}/action`
    await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(Object.assign({}, body, {
        transitiontime: transitionTime,
      })),
    }) // */
    for (const lightId of this.getLightIdsInGroup(groupId)) {
      this.updateLightState(lightId, body, transitionTime)
    }
  }

  displayScene = async (
    groupId: number,
    sceneId: string,
    transitionTime = 0,
  ): Promise<void> => {
    if (!this.apiUrl) {
      return
    }

    const url = `${this.apiUrl}/groups/${groupId}/action`
    await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        scene: sceneId,
        transitiontime: transitionTime,
      }),
    })
  }

  /* FETCH DATA FROM BRIDGE */

  // TODO types instead of any
  fetchLights = async () => {
    const url = `${this.apiUrl}/lights`
    const success = await this.fetchBaseLogic(url, (result: any) => {
      this.lights = result
      console.log('LIGHTS', this.lights)
    })
    return success
  }

  fetchGroups = async () => {
    const url = `${this.apiUrl}/groups`
    const success = await this.fetchBaseLogic(url, (result: any) => {
      this.groups = result
      console.log('GROUPS', this.groups)
    })
    return success
  }

  fetchScenes = async () => {
    const url = `${this.apiUrl}/scenes`
    const success = await this.fetchBaseLogic(url, (result: any) => {
      this.scenes = result
      console.log('SCENES', this.scenes)
    })
    return success
  }

  private fetchBaseLogic = async (
    url: string,
    onResponse: ((result: any) => void) = noop(),
  ) => {
    if (!this.apiUrl) {
      return
    }

    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: this.headers,
    })
    if (response) {
      onResponse(await response.json())
    }
    // return true on success, false means it was likely aborted
    return !!response
  }

  private fetchWithTimeout = (
    url: string,
    options: RequestInit = {},
    timeoutMs = 3000
  ): Promise<Response> => {
    if (this.fetchAbortTimeout) {
      clearTimeout(this.fetchAbortTimeout)
    }
    // abort if a controller already exists (for us, this means that there is another request already waiting for a response)
    if (this.fetchAbortController) {
      this.fetchAbortController.abort()
    }
    this.fetchAbortController = new AbortController()

    this.fetchAbortTimeout = setTimeout(() => {
      this.fetchAbortController.abort()
    }, timeoutMs) as unknown as number

    const config = {
      ...options,
      signal: this.fetchAbortController.signal,
    }
    return fetch(url, config)
      .then((response: Response) => {
        // any response is considered a success to fetch(),
        // so we need to manually check that the response is in the 200 range
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        return response
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted (this is expected)')
        } else {
          throw error
        }
        return null
      })
  }
}

export const colorToHex = (color: UIColor): string => {
  const formatHex = (value: number): string => `0${value.toString(16)}`.substr(-2)
  const rHex = formatHex(color.r)
  const gHex = formatHex(color.g)
  const bHex = formatHex(color.b)
  return `#${rHex}${gHex}${bHex}`
}

export const hexToColor = (hex: string): UIColor => {
  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)
  return new UIColor(r, g, b)
}

export const getLightColor = (light: LightData): string => {
  const xy = makeCGPoint(light.state.xy[0], light.state.xy[1])
  const color = colorFromXy(xy, light.modelid)
  return colorToHex(color)
}

export const getGroupColor = (group: any): string => {
  const xy = makeCGPoint(group.action.xy[0], group.action.xy[1])
  const color = colorFromXy(xy, '') // TODO need model id?
  return colorToHex(color)
}

export const stringToInt = (s: string) => parseInt(s, 10)

/**
 * Sort an array using the merge sort algorithm.
 *
 * @param {function} comparatorFn The comparator function.
 * @param {array} list The array to sort.
 * @returns {array} The sorted array.
 */
export const mergeSort = <T>(list: T[], comparatorFn: (t1: T, t2: T) => number): T[] => {
  const len = list.length
  if (len >= 2) {
    const firstHalf = list.slice(0, len / 2)
    const secondHalf = list.slice(len / 2, len)
    return merge(mergeSort(firstHalf, comparatorFn), mergeSort(secondHalf, comparatorFn), comparatorFn)
  } else {
    return list.slice()
  }
}

/**
 * The merge part of the merge sort algorithm.
 *
 * @param {function} comparatorFn The comparator function.
 * @param {array} arr1 The first sorted array.
 * @param {array} arr2 The second sorted array.
 * @returns {array} The merged and sorted array.
 */
const merge = <T>(arr1: T[], arr2: T[], comparatorFn: (t1: T, t2: T) => number): T[] => {
  const result = []
  let left1 = arr1.length
  let left2 = arr2.length
  while (left1 > 0 && left2 > 0) {
    if (comparatorFn(arr1[0], arr2[0]) <= 0) {
      result.push(arr1.shift())
      left1--
    } else {
      result.push(arr2.shift())
      left2--
    }
  }
  if (left1 > 0) {
    result.push(...arr1)
  } else {
    result.push(...arr2)
  }
  return result
}
