import React, { Component } from 'react'
import PropTypes from 'prop-types'

const FormInput = ({ id, label, value, usePrecision, onChange }) => (
  <label
    className="e85__inputWrapper"
    htmlFor={id}>
    <div>{label}</div>
    <input
      className="e85__input"
      id={id}
      type="number"
      step={usePrecision ? '0.01' : '1'}
      value={value}
      onChange={onChange}
      required={true}
      />
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

export default class E85 extends Component {
  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  setResults(fuel1Gallons, fuel2Gallons) {
    this.setState({
      fuel1Gallons,
      fuel2Gallons,
      showResults: true,
      showError: false,
    })
  }

  showError(errorMessage) {
    this.setState({
      errorMessage,
      showResults: false,
      showError: true,
    })
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    // user inputs
    const getStateValue = field => parseFloat(this.state[field])
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
    const neededEthanolPercentage = (desiredTotalGallons * desiredEthanolPercentage - currentGallons * currentEthanolPercentage) / neededGallons
    const fuel1Gallons = (neededEthanolPercentage - fuel2EthanolPercentage) *  neededGallons / (fuel1EthanolPercentage - fuel2EthanolPercentage)
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

  render() {
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
      <div className="e85">
        <form
          className="e85__form"
          onSubmit={handleSubmit}>
          <div className="e85__form__row">
            <FormInput
              id="currentGallons"
              label="Current Gallons"
              value={currentGallons}
              usePrecision={true}
              onChange={handleInput('currentGallons')}
              />
            <FormInput
              id="currentEthanolPercentage"
              label="Current Ethanol %"
              value={currentEthanolPercentage}
              onChange={handleInput('currentEthanolPercentage')}
              />
          </div>
          <div className="e85__form__row">
            <FormInput
              id="fuel1EthanolPercentage"
              label="Fuel 1 Ethanol %"
              value={fuel1EthanolPercentage}
              onChange={handleInput('fuel1EthanolPercentage')}
              />
            <FormInput
              id="fuel2EthanolPercentage"
              label="Fuel 2 Ethanol %"
              value={fuel2EthanolPercentage}
              onChange={handleInput('fuel2EthanolPercentage')}
              />
          </div>
          <div className="e85__form__row">
            <FormInput
              id="desiredTotalGallons"
              label="Total Gallons"
              value={desiredTotalGallons}
              usePrecision={true}
              onChange={handleInput('desiredTotalGallons')}
              />
            <FormInput
              id="desiredEthanolPercentage"
              label="Desired Ethanol %"
              value={desiredEthanolPercentage}
              onChange={handleInput('desiredEthanolPercentage')}
              />
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit">
            Calculate
          </button>
        </form>
        {showResults &&
          <div className="e85__results">
            <div>You need <span className="e85__resultGallons">{fuel1Gallons.toFixed(2)}</span> gallons of fuel 1</div>
            <div>You need <span className="e85__resultGallons">{fuel2Gallons.toFixed(2)}</span> gallons of fuel 2</div>
          </div>
        }
        {showError &&
          <div className="e85__error">
            {errorMessage}
          </div>
        }
      </div>
    )
  }
}
