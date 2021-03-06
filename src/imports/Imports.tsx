import * as React from 'react'
import { Button } from 'react-bootstrap'
import { EmptyObject } from '../types'
import styles from './scss/Imports.scss'

interface State {
  rawValue: string
  formattedValue: string
  shiftKeyDown: boolean
}

interface ImportData {
  name: string
  path: string
  pathLength: number
  imports: Alias[],
  thirdParty: boolean
  hasBrackets: boolean
}

interface Alias {
  importName: string
  alias?: string
}

// TODO needs logic fixed to follow actual js conventions
export default class Imports extends React.Component<EmptyObject, State> {
  input: React.RefObject<HTMLTextAreaElement> = React.createRef()
  output: React.RefObject<HTMLTextAreaElement> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      rawValue: '',
      formattedValue: '',
      shiftKeyDown: false,
    }
  }

  componentDidMount(): void {
    this.input.current.focus()
  }

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ rawValue: event.target.value })
  }

  checkKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key } = event
    const { shiftKeyDown } = this.state

    if (key === 'Shift') {
      this.setState({ shiftKeyDown: true })
    }

    if (key === 'Enter' && !shiftKeyDown) {
      event.preventDefault()
      this.fix()
    }
  }

  checkKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key } = event

    if (key === 'Shift') {
      this.setState({ shiftKeyDown: false })
    }
  }

  replaceText = (event: React.ClipboardEvent): void => {
    event.preventDefault()
    const { clipboardData } = event
    const pastedData = clipboardData.getData('Text')
    this.setState({ rawValue: pastedData }, () => {
      // TODO is this needed?
      const { rawValue } = this.state
      const textareaInput = this.input.current
      textareaInput.value = rawValue
    })
  }

  loadMockImports = (): void => {
    this.setState({
      rawValue: `import {Subject as subj, Observable as obs} from 'rxjs/Subject';
import {ADirective, AComponent, AService, APipe} from './test-module';;
import 'rxjs/add/observable/of'
import {SomeClass} from '../test-module';
import * from './idk';
import DefaultClass from './file.name';
import {idk as lol} from './'
import { lol as idk  } from '../'
import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';
import {EventEmitter, Component} from '@angular/core';;
import {  Location,  EventEmitter  } from '@angular/core'
import {TestComponent, OtherComponent, AService, SomeDirective,
  state, aservice, LOWERCASE, uppercase} from "../my/app/is/cool";
import * as something from './test-me';
import 'code';`,
    }, () => {
      // TODO is this needed?
      const { rawValue } = this.state
      const textareaInput = this.input.current
      textareaInput.value = rawValue
    })
  }

  fix = (): void => {
    const { value } = this.input.current
    const result = fixImports(value)
    this.setState({ formattedValue: result },
      () => this.output.current.focus())
  }

  render(): JSX.Element {
    document.title = 'Import Fixer'
    const { onChange, checkKeyDown, checkKeyUp, replaceText, loadMockImports, fix } = this
    const { rawValue, formattedValue } = this.state
    return (
      <div className={styles.import}>
        <h3 className={styles.import__title}>
          Import Fixer
        </h3>
        <textarea
          ref={this.input}
          className={styles.import__textarea}
          value={rawValue}
          onChange={onChange}
          onKeyDown={checkKeyDown}
          onKeyUp={checkKeyUp}
          onPaste={replaceText} />
        <div>
          <Button
            className={styles.import__button}
            onClick={loadMockImports}>
            load sample
          </Button>
          <Button
            className={styles.import__button}
            onClick={fix}>
            fix imports
          </Button>
        </div>
        <textarea
          ref={this.output}
          value={formattedValue}
          readOnly={true}
          className={styles.import__textarea} />
      </div>
    )
  }
}

const fixImports = (value: string): string => {
  // read in the data and format it
  const rawLines = value
    .replace(/;;+/g, ';') // remove duplicate semicolons
    .split('\n') // split over the newlines
  const lines: string[] = []
  let lastLineWasComplete = true
  rawLines.forEach((rawLine: string) => {
    // get rid of leading/trailing whitespace
    rawLine = rawLine.trim()
    const lastChar = rawLine[rawLine.length - 1]
    let lastLine: string
    if (lastChar === ';') {
      // line ends with a semicolon -- awesome!
      if (!lastLineWasComplete) {
        lastLine = lines[lines.length - 1]
        lines[lines.length - 1] = lastLine + ' ' + rawLine
      } else {
        lines.push(rawLine)
      }
      lastLineWasComplete = true
    } else {
      // line is complete but missing a semicolon; add it and move on
      if (lastChar === '\'' || lastChar === '"') {
        if (!lastLineWasComplete) {
          lastLine = lines[lines.length - 1]
          lines[lines.length - 1] = lastLine + ' ' + rawLine + ';'
        } else {
          lines.push(rawLine + ';')
        }
        lastLineWasComplete = true
        // line is incomplete, add what is there and flag it for the next loop
      } else {
        if (!lastLineWasComplete) {
          lastLine = lines[lines.length - 1]
          lines[lines.length - 1] = lastLine + ' ' + rawLine
        } else {
          lines.push(rawLine)
        }
        lastLineWasComplete = false
      }
    }
  })

  // create an object to hold of the module objects
  const modules: { [key: string]: ImportData } = {}
  lines.forEach((line: string) => {
    // ignore empty lines
    if (line.trim().length > 0) {
      // need module name, as well as data about import
      const data = getData(line)
      if (!modules[data.path]) {
        modules[data.path] = data // create new module object
      } else {
        // add data to existing module object
        const newImports = data.imports
        // loop over all the new imports
        newImports.forEach((newImport: Alias) => {
          // check if module already contains this import
          let alreadyContained = false
          modules[data.path].imports.forEach((existingValue: Alias) => {
            if (existingValue.importName === newImport.importName) {
              alreadyContained = true
            }
          })
          if (!alreadyContained) {
            // this module doesn't exist yet, so add it
            modules[data.path].imports.push(newImport)
          }
        })
      }
    }
  })

  // sort imports and split into third party and internal imports
  const thirdPartyImports: ImportData[] = []
  const internalImports: ImportData[] = []
  for (const prop in modules) {
    const currentModule = modules[prop]
    currentModule.imports.sort((a: Alias, b: Alias) => {
      return a.importName.toLowerCase().localeCompare(b.importName.toLowerCase())
    })
    if (currentModule.thirdParty) {
      thirdPartyImports.push(currentModule)
    } else {
      internalImports.push(currentModule)
    }
  }

  // sort modules by name
  const compareImports = (a: ImportData, b: ImportData): number => {
    const comparisonResult = a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    if (comparisonResult === 0) {
      return a.pathLength < b.pathLength ? -1 : 1
    }
    return comparisonResult
  }
  const sorter = (a: ImportData, b: ImportData): number => {
    if (a.imports.length === 0) {
      if (b.imports.length === 0) {
        // a and b both have no imports, so sort by module name
        return compareImports(a, b)
      } else {
        // a has no imports but b does, so b comes first
        return 1
      }
    } else if (b.imports.length === 0) {
      // b has no imports but a does, so a comes first
      return -1
    }
    // a and b both have imports, so sort by module name
    return compareImports(a, b)
  }
  thirdPartyImports.sort(sorter)
  internalImports.sort(sorter)

  // generate the final string
  let result = ''
  if (thirdPartyImports) {
    thirdPartyImports.forEach(({ imports, path, hasBrackets }: ImportData, index: number) => {
      const importStr = generateImportString(imports, path, hasBrackets)
      result += importStr + (index < thirdPartyImports.length - 1 ? '\n' : '')
    })
    result += internalImports ? '\n\n' : ''
  }
  if (internalImports) {
    internalImports.forEach(({ imports, path, hasBrackets }: ImportData, index: number) => {
      const importStr = generateImportString(imports, path, hasBrackets)
      result += importStr + (index < internalImports.length - 1 ? '\n' : '')
    })
  }

  return result.trim()
}

const getData = (str: string): ImportData => {
  // module data
  const moduleName = str.indexOf('\'') > -1
    ? str.substring(str.indexOf('\'') + 1, str.lastIndexOf('\''))
    : str.substring(str.indexOf('"') + 1, str.lastIndexOf('"'))

  // TODO fix this to be module name, not path name
  let firstModuleNameChar = moduleName.search(/[^./]/)
  if (firstModuleNameChar === -1) { // only a relative path, no folder/file names
    firstModuleNameChar = moduleName.length
  }
  const prefixLength = moduleName.substr(0, firstModuleNameChar).length
  const moduleNameStripped = moduleName.substr(firstModuleNameChar).trim()

  // import data
  const aliases: Alias[] = []
  let hasBrackets: boolean
  if (str.indexOf('{') > -1 && str.indexOf('}') > -1) {
    hasBrackets = true
    const imports = str.substring(str.indexOf('{') + 1, str.indexOf('}')).split(',')
    imports.forEach((value: string) => {
      if (value.indexOf(' as ') > -1) {
        const data = value.split(' as ')
        aliases.push({ importName: data[0].trim(), alias: data[1].trim() })
      } else {
        aliases.push({ importName: value.trim() })
      }
    })
  } else {
    hasBrackets = false
    if (str.indexOf('from') > -1) {
      const importStr = str.substring(str.indexOf('import') + 6, str.indexOf('from'))
      if (importStr.indexOf(' as ') > -1) { // case: import thing as idk from './foo';
        const data = importStr.split(' as ')
        aliases.push({ importName: data[0].trim(), alias: data[1].trim() })
      } else { // case: import thing from './foo';
        aliases.push({ importName: importStr.trim() })
      }
    } // else --> case: import './foo';
  }

  return {
    name: moduleNameStripped,
    path: moduleName,
    pathLength: prefixLength,
    imports: aliases,
    thirdParty: !/[./]/.test(moduleName[0]),
    hasBrackets,
  }
}

const generateImportString = (imports: Alias[], moduleName: string, useBrackets: boolean): string => {
  let importStr = `import ${useBrackets ? '{ ' : ''}`
  if (imports.length > 0) {
    imports.forEach(({ importName, alias }: Alias, index: number) => {
      importStr += importName
        + (alias ? ` as ${alias}` : '')
        + (index < imports.length - 1 ? ', ' : '')
    })
    importStr += `${useBrackets ? ' }' : ''} from '${moduleName}';`
  } else {
    importStr += `'${moduleName}';`
  }

  // limit line to 140 characters (TODO make this an option)
  return importStr.length > 140
    ? importStr.replace(/{ /, '{\n    ').replace(/, /g, ',\n    ').replace(/ }/, '\n}')
    : importStr
}
