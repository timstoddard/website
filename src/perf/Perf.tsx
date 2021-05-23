import classNames from 'classnames'
import * as React from 'react'
import { Button } from 'react-bootstrap'
import { EmptyObject } from '../types'
import styles from './scss/Perf.scss'

/*
const sampleSnippets = [
  'const a = Math.pow(Math.sqrt(123456789123456789), 1.23456789)',
  'const b = Math.pow(Math.pow(2, 2), 2)',
  'const c = Math.pow(Math.pow(Math.pow(2, 2), 2), 2)',
  'const tim = "tim;',
]
*/

interface State {
  snippetsToTest: string[]
  numberOfRuns: number
  runningTests: boolean
  results: Result[],
}

type Result = SuccessResult | ErrorResult

interface SuccessResult {
  id: number
  min: string
  max: string
  avg: string
  total: string
  place: number
  isBest: boolean
  isWorst: boolean
}

interface ErrorResult {
  id: number
  error: string
  avg: string
  place: number
}

export default class Perf extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      snippetsToTest: ['', ''],
      numberOfRuns: 1000,
      runningTests: false,
      results: [],
    }
  }

  addSnippet = (): void => {
    const { snippetsToTest } = this.state
    const newSnippets = [...snippetsToTest]
    newSnippets.push('')
    this.setState({ snippetsToTest: newSnippets })
  }

  removeSnippet = (index: number): (() => void) => {
    return (): void => {
      const { snippetsToTest } = this.state
      const newSnippets = [...snippetsToTest]
      newSnippets.splice(index, 1)
      this.setState({ snippetsToTest: newSnippets })
    }
  }

  updateSnippet = (index: number): ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
    return ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { snippetsToTest } = this.state
      const newSnippets = [...snippetsToTest]
      newSnippets[index] = target.value
      this.setState({ snippetsToTest: newSnippets })
    }
  }

  ignoreTab = (index: number): ((e: React.KeyboardEvent<HTMLTextAreaElement>) => void) => {
    return (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const textarea = e.target as HTMLTextAreaElement
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

  updateNumberOfRuns = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ numberOfRuns: parseInt(target.value, 10) })
  }

  runTests = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const {
      snippetsToTest,
      numberOfRuns,
    } = this.state
    if (snippetsToTest.length === 0) {
      return
    }
    this.setState({ runningTests: true }, () => {
      const results: Result[] = []
      const sixDecimalPlaces = (n: number): string => n.toFixed(6)
      setTimeout(() => {
        let bestAvg = Infinity
        let bestAvgIndex = -1
        let worstAvg = -Infinity
        let worstAvgIndex = -1
        snippetsToTest.forEach((snippet: string, index: number) => {
          let minTime = Infinity
          let maxTime = -Infinity
          let totalTime = 0
          let error = null
          for (let i = 0; i < numberOfRuns; i++) {
            const startTime = performance.now()
            try {
              // TODO rewrite this to put snippet in a script tag and execute it that way
              // tslint:disable-next-line:no-eval
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
              error,
              avg: 'n/a',
              place: 0,
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
        const bestResult = results[bestAvgIndex] as SuccessResult
        bestResult.isBest = true
        const worstResult = results[worstAvgIndex] as SuccessResult
        worstResult.isWorst = true
        const resultsCopy = [...results]
        resultsCopy.sort((a: Result, b: Result) => parseFloat(a.avg) - parseFloat(b.avg))
        resultsCopy.forEach(({ id }: Result, index: number) => {
          results[index].place = id + 1
        })
        this.setState({
          results,
          runningTests: false,
        })
      }, 100)
    })
  }

  render(): JSX.Element {
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
      <div className={styles.perf}>
        <h4 className={styles.perf__header}>
          JavaScript Performance Testing
        </h4>
        <form
          className={styles.perf__form}
          onSubmit={runTests}>
          {snippetsToTest.map((snippet: string, index: number) => (
            <div key={`${index + 1}`}>
              <div className={styles.perf__form__snippetHeader}>
                <div className={styles.perf__form__snippetHeader__title}>
                  Snippet {index + 1}
                </div>
                <div className={styles.perf__form__snippetHeader__spacer} />
                <div
                  className={styles.perf__form__snippetHeader__delete}
                  onClick={removeSnippet(index)}>
                  <svg viewBox='0 0 24 24'>
                    <g>
                      {
                        // tslint:disable-next-line:max-line-length
                        <path d='M 5.625 4.21875 L 4.21875 5.625 L 10.59375 12 L 4.21875 18.375 L 5.625 19.78125 L 12 13.40625 L 18.375 19.78125 L 19.78125 18.375 L 13.40625 12 L 19.78125 5.625 L 18.375 4.21875 L 12 10.59375 Z ' />
                      }
                    </g>
                  </svg>
                </div>
              </div>
              <textarea
                className={styles.perf__form__snippetText}
                value={snippet}
                onChange={updateSnippet(index)}
                onKeyDown={ignoreTab(index)}
                cols={20}
                rows={10} />
            </div>
          ))}
          <Button onClick={addSnippet}>
            Add New Code Snippet
          </Button>
          <div className={styles.perf__form__numberOfRuns}>
            <div className={styles.perf__form__numberOfRuns__title}>
              Number of Tests to Run:
            </div>
            <input
              className={styles.perf__form__numberOfRuns__input}
              type='number'
              value={numberOfRuns}
              onChange={updateNumberOfRuns} />
          </div>
          {!runningTests &&
            <Button type='submit'>
              Run tests
            </Button>
          }
          {runningTests &&
            <div>Running tests...</div>
          }
        </form>
        {!!results.length &&
          <div className={styles.perf__results}>
            <h3 className={styles.perf__results__header}>
              Results
            </h3>
            {results.map((result: Result, index: number) => (
              <div key={result.id}>
                <hr />
                <h5>
                  Snippet {index + 1}
                  {(result as ErrorResult).error
                    ? ' (ERROR)'
                    : ` (#${result.place} average time)`
                  }
                </h5>
                {(result as ErrorResult).error ? (
                  <div className={styles.perf__results__details}>
                    This code snippet encountered an error: <strong>{(result as ErrorResult).error}</strong>
                  </div>
                ) : (
                  <dl className={classNames(
                    styles.perf__results__details,
                    {
                      [styles['perf__results__details--best']]: (result as SuccessResult).isBest,
                      [styles['perf__results__details--worst']]: (result as SuccessResult).isWorst,
                    })}>
                    <dt>
                      <strong>Avg</strong>
                    </dt>
                    <dd>
                      <strong>{(result as SuccessResult).avg} ms</strong>
                    </dd>
                    <dt>Min</dt>
                    <dd>{(result as SuccessResult).min} ms</dd>
                    <dt>Max</dt>
                    <dd>{(result as SuccessResult).max} ms</dd>
                    <dt>Total</dt>
                    <dd>{(result as SuccessResult).total} ms</dd>
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
