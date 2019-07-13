import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import alternatingCapsTransform from './transformers/alternating-caps'
import partyParrotTransform from './transformers/party-parrot';

interface State {
  rawValue: string
  alternatingCapsText: string
  partyParrotText: string[][]
}

export default class TextTools extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      rawValue: '',
      alternatingCapsText: '',
      partyParrotText: [],
    }
  }

  handleChange = (event: React.ChangeEvent): void => {
    this.setState({ rawValue: (event.target as HTMLInputElement).value })
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    this.transform()
  }

  transform = (): void => {
    const { rawValue } = this.state
    const alternatingCapsText = alternatingCapsTransform(rawValue)
    const partyParrotText = partyParrotTransform(rawValue)
    this.setState({
      alternatingCapsText,
      partyParrotText,
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
      partyParrotText,
    } = this.state

    return (
      <div className='textTools'>
        <h3 className='textTools__title'>
          Fun Text Tools
        </h3>
        <Form
          onSubmit={handleSubmit}
          className='textTools__form'>
          <Form.Group controlId='rawValue'>
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
        <ul className='textTools__output'>
          <li>
            {alternatingCapsText}
          </li>
          <li>
            {partyParrotText.map((row: string[], i: number) => (
              <div
                key={i}
                className='textTools__partyParrot__row'>
                {row.map((value: string, i2: number) => !!value
                  ? (
                    <img
                      key={i2}
                      className='textTools__partyParrot__img'
                      src={value} />
                  ) : (
                    <div
                      key={i2}
                      className='textTools__partyParrot__img' />
                  ))}
              </div>
            ))}
          </li>
        </ul>
      </div>
    )
  }
}
