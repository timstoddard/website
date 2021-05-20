import classNames from 'classnames'
import * as React from 'react'
import { HueApi } from './hue-utils'
import styles from './scss/Hue.scss'

interface Props {
  hueApi: HueApi
}

interface State {
  selectedSceneId: string
}

export default class Scenes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

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
      <>
        {/* TODO fix classnames (shared scss names I guess) */}
        <ul className={styles.hueGroups__list}>
          {sceneIds.map((sceneId: string) => (
            <li
              key={sceneId}
              onClick={selectScene(sceneId)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: selectedSceneId === sceneId })}>
              {scenes[sceneId].name}
            </li>
          ))}
        </ul>
        {selectedScene && (
          <div className={styles.hueGroups__detail}>
            Scene details (TODO)
          </div>
        )}
      </>
    )
  }
}
