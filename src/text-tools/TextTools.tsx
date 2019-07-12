import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface State {
  rawValue: string
  transformedValue: string
}

export default class TextTools extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      rawValue: '',
      transformedValue: '',
    }
  }

  handleChange = (event: React.ChangeEvent): void => {
    this.setState({ rawValue: (event.target as HTMLInputElement).value })
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    this.foo()
  }

  foo = (): void => {
    const { rawValue } = this.state
    let result = ''
    let lastWasUpper = true // make first char lowercase
    const alphabetRegex = /[a-z]/i

    for (const c of rawValue) {
      if (alphabetRegex.test(c)) {
        result += lastWasUpper ? c.toLowerCase() : c.toUpperCase()
        lastWasUpper = !lastWasUpper
      } else {
        result += c
      }
    }
    this.setState({ transformedValue: result })
  }

  render(): JSX.Element {
    document.title = 'Text Tools'
    const {
      handleChange,
      handleSubmit,
    } = this
    const {
      rawValue,
      transformedValue,
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
        <div className='textTools__output'>
          {transformedValue}
        </div>
      </div>
    )
  }
}
