import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import alternatingCapsTransform from './transformers/alternating-caps'
import partyParrotTransform from './transformers/party-parrot'
import { EmptyObject } from '../types'
import styles from './scss/TextTools.scss'

interface State {
  rawValue: string
  alternatingCapsText: string
  alternatingCaps2Text: string
  partyParrotText: string[][]
  hasText: boolean
}

export default class TextTools extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      rawValue: '',
      alternatingCapsText: '',
      alternatingCaps2Text: '',
      partyParrotText: [],
      hasText: false,
    }
  }

  handleChange = (event: React.FormEvent): void => {
    this.setState({ rawValue: (event.target as HTMLInputElement).value })
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    this.transform()
  }

  transform = (): void => {
    const { rawValue } = this.state
    const alternatingCapsText = alternatingCapsTransform(rawValue, false)
    const alternatingCaps2Text = alternatingCapsTransform(rawValue, true)
    const partyParrotText = partyParrotTransform(rawValue)
    this.setState({
      alternatingCapsText,
      alternatingCaps2Text,
      partyParrotText,
      hasText: !!rawValue,
    })
  }

  render(): JSX.Element {
    document.title = 'Text Tools'
    const {
      handleChange,
      handleSubmit,
    } = this
    const {
      rawValue,
      alternatingCapsText,
      alternatingCaps2Text,
      partyParrotText,
      hasText,
    } = this.state

    return (
      <div className={styles.textTools}>
        <h3 className={styles.textTools__title}>
          Fun Text Tools
        </h3>
        <Form
          onSubmit={handleSubmit}
          className={styles.textTools__form}>
          <Form.Group
            controlId='rawValue'
            className={styles.textTools__formGroup}>
            <Form.Label>Enter some text</Form.Label>
            <Form.Control
              type='text'
              value={rawValue}
              onChange={handleChange}
              placeholder='Type words here...' />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'>
            Transform
          </Button>
        </Form>
        {hasText && (
          <ul>
            <li>
              <h4>Alternating Caps Text</h4>
              <p>{alternatingCapsText}</p>
              <p>{alternatingCaps2Text}</p>
            </li>
            <li>
              <h4>Party Parrot Text</h4>
              {partyParrotText.map((row: string[], i: number) => (
                <div
                  key={i}
                  className={styles.textTools__partyParrot__row}>
                  {row.map((value: string, i2: number) => !!value
                    ? (
                      <img
                        key={i2}
                        className={styles.textTools__partyParrot__img}
                        src={value} />
                    ) : (
                      <div
                        key={i2}
                        className={styles.textTools__partyParrot__img} />
                    ))}
                </div>
              ))}
            </li>
          </ul>
        )}
      </div>
    )
  }
}
