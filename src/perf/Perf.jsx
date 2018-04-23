import React, { Component } from 'react'

/*
const sampleSnippets = [
  'const a = Math.pow(Math.sqrt(123456789123456789), 1.23456789)',
  'const b = Math.pow(Math.pow(2, 2), 2)',
  'const c = Math.pow(Math.pow(Math.pow(2, 2), 2), 2)',
  'const tim = "tim;',
]
*/

export default class Perf extends Component {
  constructor() {
    super()

    this.addSnippet = this.addSnippet.bind(this)
    this.removeSnippet = this.removeSnippet.bind(this)
    this.updateSnippet = this.updateSnippet.bind(this)
    this.ignoreTab = this.ignoreTab.bind(this)
    this.updateNumberOfRuns = this.updateNumberOfRuns.bind(this)
    this.runTests = this.runTests.bind(this)

    this.state = {
      snippetsToTest: ['', ''],
      numberOfRuns: 10000,
      runningTests: false,
      results: [],
    }
  }

  addSnippet () {
    const { snippetsToTest } = this.state
    const newSnippets = [...snippetsToTest]
    newSnippets.push('')
    this.setState({ snippetsToTest: newSnippets })
  }

  removeSnippet(index) {
    return () => {
      const { snippetsToTest } = this.state
      const newSnippets = [...snippetsToTest]
      newSnippets.splice(index, 1)
      this.setState({ snippetsToTest: newSnippets })
    }
  }

  updateSnippet(index) {
    return ({ target }) => {
      const { snippetsToTest } = this.state
      const newSnippets = [...snippetsToTest]
      newSnippets[index] = target.value
      this.setState({ snippetsToTest: newSnippets })
    }
  }

  ignoreTab(index) {
    return (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const textarea = e.target
        const {
          selectionStart: start,
          selectionEnd: end,
          value: oldSnippet,
        } = textarea
        const newSnippet = `${oldSnippet.substring(0, start)}\t${oldSnippet.substring(end)}`
        const { snippetsToTest } = this.state
        const newSnippets = [...snippetsToTest]
        newSnippets[index] = newSnippet
        this.setState({ snippetsToTest: newSnippets }, () => {
          textarea.selectionStart = start + 1
          textarea.selectionEnd = start + 1
        })
      }
    }
  }

  updateNumberOfRuns({ target }) {
    this.setState({ numberOfRuns: target.value })
  }

  runTests(e) {
    e.preventDefault()
    const {
      snippetsToTest,
      numberOfRuns,
    } = this.state
    if (snippetsToTest.length === 0) {
      return
    }
    this.setState({ runningTests: true }, () => {
      const results = []
      const sixDecimalPlaces = n => n.toFixed(6)
      setTimeout(() => {
        let bestAvg = Infinity
        let bestAvgIndex = 0
        let worstAvg = -Infinity
        let worstAvgIndex = 0
        snippetsToTest.forEach((snippet, index) => {
          let minTime = Infinity
          let maxTime = -Infinity
          let totalTime = 0
          let error = null
          for (let i = 0; i < numberOfRuns; i++) {
            const startTime = performance.now()
            try {
              // TODO rewrite this to put snippet in a script tag and execute it that way
              eval(snippet)
            } catch (e) {
              error = e.message
              break
            }
            const endTime = performance.now()
            const diff = endTime - startTime
            totalTime += diff
            if (diff < minTime) {
              minTime = diff
            }
            if (diff > maxTime) {
              maxTime = diff
            }
          }
          const avg = totalTime / numberOfRuns
          if (error) {
            results.push({
              id: index,
              avg: NaN,
              error,
            })
          } else {
            results.push({
              id: index,
              min: sixDecimalPlaces(minTime),
              max: sixDecimalPlaces(maxTime),
              avg: sixDecimalPlaces(avg),
              total: sixDecimalPlaces(totalTime),
              place: 0,
              isBest: false,
              isWorst: false,
            })
            if (avg < bestAvg) {
              bestAvg = avg
              bestAvgIndex = index
            }
            if (avg > worstAvg) {
              worstAvg = avg
              worstAvgIndex = index
            }
          }
        })
        results[bestAvgIndex].isBest = true
        results[worstAvgIndex].isWorst = true
        const resultsCopy = [...results]
        resultsCopy.sort((a, b) => a.avg - b.avg)
        resultsCopy.forEach(({ id }, index) => {
          results[index].place = id + 1
        })
        this.setState({
          results,
          runningTests: false,
        })
      }, 100)
    })
  }

  render() {
    document.title = 'Performance Testing'
    const {
      runTests,
      addSnippet,
      removeSnippet,
      updateSnippet,
      ignoreTab,
      updateNumberOfRuns,
    } = this
    const {
      snippetsToTest,
      numberOfRuns,
      runningTests,
      results,
    } = this.state
    return (
      <div className="perf">
        <h4 className="perf__header">
          JavaScript Performance Testing
        </h4>
        <form
          className="perf__form"
          onSubmit={runTests}>
          {snippetsToTest.map((snippet, index) => (
            <div key={`${index + 1}`}>
              <div className="perf__form__snippetHeader">
                <div className="perf__form__snippetHeader__title">
                  Snippet {index + 1}
                </div>
                <div className="perf__form__snippetHeader__spacer" />
                <div
                  className="perf__form__snippetHeader__delete"
                  onClick={removeSnippet(index)}>
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M 5.625 4.21875 L 4.21875 5.625 L 10.59375 12 L 4.21875 18.375 L 5.625 19.78125 L 12 13.40625 L 18.375 19.78125 L 19.78125 18.375 L 13.40625 12 L 19.78125 5.625 L 18.375 4.21875 L 12 10.59375 Z " />
                    </g>
                  </svg>
                </div>
              </div>
              <textarea
                className="perf__form__snippetText"
                value={snippet}
                onChange={updateSnippet(index)}
                onKeyDown={ignoreTab(index)}
                cols="20"
                rows="10"
                />
            </div>
          ))}
          <a
            className="perf__button btn light-blue"
            onClick={addSnippet}>
            Add New Code Snippet
          </a>
          <div className="perf__form__numberOfRuns">
            <div className="perf__form__numberOfRuns__title">
              Number of Tests to Run:
            </div>
            <input
              className="perf__form__numberOfRuns__input"
              type="number"
              value={numberOfRuns}
              onChange={updateNumberOfRuns}
              />
          </div>
          {!runningTests &&
            <input
              className="perf__button btn red"
              type="submit"
              value="Run Tests"
              />
          }
          {runningTests &&
            <div>Running tests...</div>
          }
        </form>
        {!!results.length &&
          <div className="perf__results">
            <h3 className="perf__results__header">
              Results
            </h3>
            {results.map(({
              id,
              min,
              max,
              avg,
              total,
              place,
              isBest,
              isWorst,
              error,
            }, index) => (
              <div key={id}>
                <hr />
                <h5>
                  Snippet {index + 1}
                  {error
                    ? ' (ERROR)'
                    : ` (#${place} average time)`
                  }
                </h5>
                {error ? (
                  <div className="perf__results__details">
                    This code snippet encountered an error: <strong>{error}</strong>
                  </div>
                ) : (
                  <dl className={`perf__results__details ${isBest ? 'perf__results__details--best' : ''} ${isWorst ? 'perf__results__details--worst' : ''}`}>
                    <dt>
                      <strong>Avg</strong>
                    </dt>
                    <dd>
                      <strong>{avg} ms</strong>
                    </dd>
                    <dt>Min</dt>
                    <dd>{min} ms</dd>
                    <dt>Max</dt>
                    <dd>{max} ms</dd>
                    <dt>Total</dt>
                    <dd>{total} ms</dd>
                  </dl>
                )}
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}
