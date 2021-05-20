import classNames from 'classnames'
import * as React from 'react'
import { UIColor } from './hue-color-conversion'
import styles from './scss/Hue.scss'

interface BeatLightProps {
  on: boolean
  color: UIColor
  brightness: number
}

const formatBgColor = (c: UIColor): string => c
  ? `rgb(${c.r},${c.g},${c.b})`
  : 'black'

const formatBrightness = (brightness: number): number => brightness
  ? brightness / 100
  : 100

const BeatLight = ({ on, color, brightness }: BeatLightProps): JSX.Element => (
  <div
    className={classNames(
      styles.beatLight,
      /*{ [styles['beatLight--off']]: !on }*/)}
    style={{
      background: formatBgColor(color),
      opacity: formatBrightness(brightness),
    }}>
  </div>
)

export default BeatLight
