import { get, set } from '../start/Utils'
import { colorFromXy, makeCGPoint, UIColor } from './hue-color-conversion'
import { LightData, Lights } from './Light'

export class HueApi {
  private apiUrl: string
  private lights: Lights = {}
  private groups: any // TODO type
  private scenes: any // TODO type
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

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
    this.apiUrl = `http://${hueUrl}/api/${hueUserId}`

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
    return Object.keys(this.lights).map(stringToInt)
  }

  getGroups = (): any => {
    return this.groups
  }

  getGroup = (groupId: number): any => {
    return this.groups[groupId]
  }

  getGroupIds = (): number[] => {
    return Object.keys(this.groups).map(stringToInt)
  }

  getLightIdsInGroup = (groupId: number): number[] => {
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
    return Object.keys(this.scenes)
  }

  /* SETTERS */

  updateLightState = async (
    lightId: number | string,
    body: unknown,
    transitionTime: number = 0,
  ): Promise<void> => {
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
    transitionTime: number = 0,
  ): Promise<void> => {
    /* // TODO this doesn't seem to work (choppy/laggy)
    const url = `${this.apiUrl}/groups/${groupId}/action`
    await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(Object.assign({}, body, {
        transitiontime: transitionTime,
      })),
    }) // */
    const lightIds = this.getLightIdsInGroup(groupId)
    for (const lightId of lightIds) {
      this.updateLightState(lightId, body, transitionTime)
    }
  }

  displayScene = async (
    groupId: number,
    sceneId: string,
    transitionTime: number = 0,
  ): Promise<void> => {
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

  fetchLights = async (): Promise<void> => {
    const url = `${this.apiUrl}/lights`
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: this.headers,
    })
    this.lights = await response.json()
    console.log('LIGHTS', this.lights)
  }

  fetchGroups = async (): Promise<void> => {
    const url = `${this.apiUrl}/groups`
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: this.headers,
    })
    this.groups = await response.json()
    console.log('GROUPS', this.groups)
  }

  fetchScenes = async (): Promise<void> => {
    const url = `${this.apiUrl}/scenes`
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: this.headers,
    })
    this.scenes = await response.json()
    console.log('SCENES', this.scenes)
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

export const stringToInt = (id: string): number => parseInt(id, 10)

const fetchWithTimeout = (url: string, options: RequestInit = {}, timeoutMs: number = 3000): Promise<Response> => {
  const controller = new AbortController()
  const config = {
    ...options,
    signal: controller.signal,
  }
  setTimeout(() => controller.abort(), timeoutMs)
  return fetch(url, config)
    .then((response: Response) => {
      // Because _any_ response is considered a success to `fetch`,
      // we need to manually check that the response is in the 200 range.
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return response
    })
    .catch((error: Error) => {
      const message = error.name === 'AbortError' ? 'Response timed out' : error.message
      throw new Error(message)
    })
}
