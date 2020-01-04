import * as React from 'react'

import { Mode } from './PeriodicTable'

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
      className={[
        'mode__toggle',
        showModeSelect ? 'mode__toggle--open' : '',
      ].join(' ')}>
      Mode
    </div>
    {showModeSelect && (<>
      <div
        onClick={toggleMode}
        className='mode__shield' />
      <div className='mode__wrapper'>
        <select
          onChange={handleSelectChange}
          value={mode}
          className='mode__select'>
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
