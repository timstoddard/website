import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import FormInput from './FormInput'
import styles from './scss/E85.scss'

interface State {
  currentGallons: number
  currentEthanolPercentage: number
  fuel1EthanolPercentage: number
  fuel2EthanolPercentage: number
  desiredTotalGallons: number
  desiredEthanolPercentage: number
  fuel1Gallons: number
  fuel2Gallons: number
  showResults: boolean
  errorMessage: string
  showError: boolean
}

export default class E85 extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      currentGallons: 0,
      currentEthanolPercentage: 30,
      fuel1EthanolPercentage: 85,
      fuel2EthanolPercentage: 0,
      desiredTotalGallons: 15,
      desiredEthanolPercentage: 30,
      fuel1Gallons: 0,
      fuel2Gallons: 0,
      showResults: false,
      errorMessage: '',
      showError: false,
    }
  }

  setResults = (fuel1Gallons: number, fuel2Gallons: number): void => {
    this.setState({
      fuel1Gallons,
      fuel2Gallons,
      showResults: true,
      showError: false,
    })
  }

  showError = (errorMessage: string): void => {
    this.setState({
      errorMessage,
      showResults: false,
      showError: true,
    })
  }

  handleInput = (field: keyof State): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ [field]: e.target.value } as unknown as State)
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    // user inputs
    const getStateValue = (field: keyof State): number => parseFloat(this.state[field] as string)
    const currentGallons = getStateValue('currentGallons')
    const currentEthanolPercentage = getStateValue('currentEthanolPercentage')
    const fuel1EthanolPercentage = getStateValue('fuel1EthanolPercentage')
    const fuel2EthanolPercentage = getStateValue('fuel2EthanolPercentage')
    const desiredTotalGallons = getStateValue('desiredTotalGallons')
    const desiredEthanolPercentage = getStateValue('desiredEthanolPercentage')

    // calculations
    const neededGallons = desiredTotalGallons - currentGallons
    if (neededGallons <= 0) {
      this.showError('Your desired gallons must be greater than your current gallons.')
      return
    }
    const neededEthanolPercentage =
      (desiredTotalGallons * desiredEthanolPercentage - currentGallons * currentEthanolPercentage)
      / neededGallons
    const fuel1Gallons =
      (neededEthanolPercentage - fuel2EthanolPercentage)
      * neededGallons
      / (fuel1EthanolPercentage - fuel2EthanolPercentage)
    const fuel2Gallons = neededGallons - fuel1Gallons
    if (neededEthanolPercentage < 0
      || fuel1Gallons > neededGallons
      || fuel1Gallons < 0
      || fuel2Gallons < 0
    ) {
      this.showError('The input you provided is impossible.')
      return
    }

    this.setResults(fuel1Gallons, fuel2Gallons)
  }

  render(): JSX.Element {
    document.title = 'E85 Calculator'

    const {
      handleInput,
      handleSubmit,
    } = this
    const {
      currentGallons,
      currentEthanolPercentage,
      fuel1EthanolPercentage,
      fuel2EthanolPercentage,
      desiredTotalGallons,
      desiredEthanolPercentage,
      fuel1Gallons,
      fuel2Gallons,
      showResults,
      errorMessage,
      showError,
    } = this.state

    return (
      <div className={styles.e85}>
        <Form
          className={styles.e85__form}
          onSubmit={handleSubmit}>
          <div className={styles.e85__form__row}>
            <FormInput
              id='currentGallons'
              label='Current Gallons'
              value={currentGallons}
              usePrecision={true}
              onChange={handleInput('currentGallons')} />
            <FormInput
              id='currentEthanolPercentage'
              label='Current Ethanol %'
              value={currentEthanolPercentage}
              onChange={handleInput('currentEthanolPercentage')} />
          </div>
          <div className={styles.e85__form__row}>
            <FormInput
              id='fuel1EthanolPercentage'
              label='Fuel 1 Ethanol %'
              value={fuel1EthanolPercentage}
              onChange={handleInput('fuel1EthanolPercentage')} />
            <FormInput
              id='fuel2EthanolPercentage'
              label='Fuel 2 Ethanol %'
              value={fuel2EthanolPercentage}
              onChange={handleInput('fuel2EthanolPercentage')} />
          </div>
          <div className={styles.e85__form__row}>
            <FormInput
              id='desiredTotalGallons'
              label='Total Gallons'
              value={desiredTotalGallons}
              usePrecision={true}
              onChange={handleInput('desiredTotalGallons')} />
            <FormInput
              id='desiredEthanolPercentage'
              label='Desired Ethanol %'
              value={desiredEthanolPercentage}
              onChange={handleInput('desiredEthanolPercentage')} />
          </div>
          <Button type='submit'>
            Calculate
          </Button>
        </Form>
        {showResults &&
          <div className={styles.e85__results}>
            <div>You need <span className={styles.e85__resultGallons}>
              {fuel1Gallons.toFixed(2)}
            </span> gallons of fuel 1</div>
            <div>You need <span className={styles.e85__resultGallons}>
              {fuel2Gallons.toFixed(2)}
            </span> gallons of fuel 2</div>
          </div>
        }
        {showError &&
          <div className={styles.e85__error}>
            {errorMessage}
          </div>
        }
      </div>
    )
  }
}
