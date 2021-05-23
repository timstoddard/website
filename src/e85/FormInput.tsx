import * as React from 'react'
import { Form } from 'react-bootstrap'
import { noop } from '../types'
import styles from './scss/E85.scss'

interface Props {
  id: string
  label: string
  value: number | string
  usePrecision?: boolean
  onChange: (e: React.FormEvent) => void
}

const FormInput: React.FunctionComponent<Props> = ({
  id,
  label,
  value,
  usePrecision = false,
  onChange = noop(),
}: Props): JSX.Element => (
  <Form.Group
    controlId={id}
    className={styles.e85__inputWrapper}>
    <Form.Label>
      {label}
    </Form.Label>
    <Form.Control
      className={styles.e85__input}
      type='number'
      step={usePrecision ? '0.01' : '1'}
      value={value.toString()}
      onChange={onChange}
      required={true}
      />
  </Form.Group>
)

export default FormInput
