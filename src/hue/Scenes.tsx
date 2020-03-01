import * as React from 'react'
import { HueApi } from './hue-utils'

interface Props {
  hueApi: HueApi
}

interface State {
  selectedSceneId: string
}

export default class Scenes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { hueApi } = this.props
    // const foo = hueApi.getS

    this.state = {
      selectedSceneId: '',
    }
  }

  selectScene = (sceneId: string) => async () => { // tslint:disable-line:typedef
    const { hueApi } = this.props
    this.setState({ selectedSceneId: sceneId })
    const todoGroupId = 1
    await hueApi.displayScene(todoGroupId, sceneId)
  }

  render(): JSX.Element {
    const {
      selectScene,
    } = this
    const {
      hueApi,
    } = this.props
    const {
      selectedSceneId,
    } = this.state

    const scenes = hueApi.getScenes()
    const sceneIds = hueApi.getSceneIds()
    const selectedScene = hueApi.getScene(selectedSceneId)

    return (
      <div className='hueGroups'>
        {/* TODO fix classnames (shared scss names I guess) */}
        <ul className='hueGroups__list'>
          {sceneIds.map((sceneId: string) => (
            <li
              key={sceneId}
              onClick={selectScene(sceneId)}
              className={`hueGroups__listItem ${selectedSceneId === sceneId ? 'hueGroups__listItem--selected' : ''}`}>
              {/* [{sceneId}] */}
              {scenes[sceneId].name}
            </li>
          ))}
        </ul>
        {selectedScene && (
          <div className='hueGroups__detail'>
            Scene details (TODO)
          </div>
        )}
      </div>
    )
  }
}
