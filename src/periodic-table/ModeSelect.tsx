import classNames from 'classnames'
import * as React from 'react'
import { Mode } from './PeriodicTable'

const styles = require('./scss/ModeSelect.scss') // tslint:disable-line no-var-requires

interface Props {
  mode: Mode
  toggleMode: () => void
  showModeSelect: boolean
  handleSelectChange: (e: unknown) => void
}

const ModeSelect: React.StatelessComponent<Props> = ({
  mode,
  toggleMode,
  showModeSelect,
  handleSelectChange,
}: Props): JSX.Element => (
  <>
    <div
      onClick={toggleMode}
      className={classNames(
        styles.mode__toggle,
        { [styles['mode__toggle--open' ]]: showModeSelect })}>
      Mode
    </div>
    {showModeSelect && (<>
      <div
        onClick={toggleMode}
        className={styles.mode__shield} />
      <div className={styles.mode__wrapper}>
        <select
          onChange={handleSelectChange}
          value={mode}
          className={styles.mode__select}>
          <option value={Mode.NORMAL}>
            Normal
          </option>
          <option value={Mode.ELECTRON_AFFINITY_TREND}>
            Electron Affinity Trend
          </option>
        </select>
      </div>
    </>)}
  </>
)

export default ModeSelect
