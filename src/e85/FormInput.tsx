import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  id: string
  label: string
  value: number
  usePrecision?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.StatelessComponent<Props> = ({
  id,
  label,
  value,
  usePrecision,
  onChange,
}: Props): JSX.Element => (
  <label
    className='e85__inputWrapper'
    htmlFor={id}>
    <div>{label}</div>
    <input
      className='e85__input'
      id={id}
      type='number'
      step={usePrecision ? '0.01' : '1'}
      value={value}
      onChange={onChange}
      required={true} />
  </label>
)

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  usePrecision: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

FormInput.defaultProps = {
  usePrecision: false,
}

export default FormInput
