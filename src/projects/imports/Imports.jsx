import React, { Component } from 'react'

export default class Imports extends Component {
  constructor() {
    super()

    this.onChange = this.onChange.bind(this)
    this.checkKeyDown = this.checkKeyDown.bind(this)
    this.checkKeyUp = this.checkKeyUp.bind(this)
    this.replaceText = this.replaceText.bind(this)
    this.loadMockImports = this.loadMockImports.bind(this)
    this.fix = this.fix.bind(this)

    this.state = {
      rawValue: '',
      formattedValue: '',
      shiftKeyDown: false,
    }
  }

  onChange(event) {
    this.setState({ rawValue: event.target.value })
  }

  checkKeyDown(event) {
    if (event.key === 'Shift') {
      this.setState({ shiftKeyDown: true })
    }
    if (event.key === 'Enter' && !this.state.shiftKeyDown) {
      event.preventDefault()
      this.fix()
    }
  }

  checkKeyUp(event) {
    if (event.key === 'Shift') {
      this.setState({ shiftKeyDown: false })
    }
  }

  replaceText(event) {
    event.preventDefault()
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')
    this.setState({ rawValue: pastedData })
    document.getElementById('input').value = this.state.rawValue
  }

  loadMockImports() {
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
import {TestComponent, OtherComponent, ACoolService, SomeDirective, CoolOtherComponent, OtherOtherComponent, asyncValidator, state, acoolservice, LOWERCASE, uppercase} from "../my/app/is/cool";
import * as something from './test-me';
import 'code';`})
    document.getElementById('input').value = this.state.rawValue
  }

  fix() {
    const value = document.getElementById('input').value
    const result = fixImports(value)
    this.setState({ formattedValue: result }, () => {
      document.getElementById('output').focus()
    })
  }

  render() {
    document.title = 'Import Fixer'
    // TODO: use `ref`s to interact with textareas
    return (
      <div className="center-align">
        <h3 className="import__title">Import Fixer</h3>
        <textarea
          id="input"
          className="import__textarea"
          value={this.state.rawValue}
          onChange={this.onChange}
          onKeyDown={this.checkKeyDown}
          onKeyUp={this.checkKeyUp}
          onPaste={this.replaceText}
          />
        <div>
          <a
            className="import__button waves-effect waves-light btn light-blue accent-2"
            onClick={this.loadMockImports}>
            load sample
          </a>
          <a
            className="import__button waves-effect waves-light btn light-blue accent-2"
            onClick={this.fix}>
            fix imports
          </a>
        </div>
        <textarea
          id="output"
          value={this.state.formattedValue}
          className="import__textarea"
          />
      </div>
    )
  }
}

const fixImports = (value) => {
  // read in the data and format it
  const rawLines = value
    .replace(/;;+/g, ';') // remove duplicate semicolons
    .split('\n') // split over the newlines
  const lines = []
  let lastLineWasComplete = true
  rawLines.forEach(function(value) {
    // get rid of leading/trailing whitespace
    value = value.trim()
    const lastChar = value.charAt(value.length - 1)
    // line ends with a semicolon -- awesome!
    if (lastChar === ';') {
      if (!lastLineWasComplete) {
        var lastLine = lines[lines.length - 1]
        lines[lines.length - 1] = lastLine + ' ' + value
      } else {
        lines.push(value)
      }
      lastLineWasComplete = true
    } else {
      // line is complete but missing a semicolon; add it and move on
      if (lastChar === '\'' || lastChar === '"') {
        if (!lastLineWasComplete) {
          lastLine = lines[lines.length - 1]
          lines[lines.length - 1] = lastLine + ' ' + value + ';'
        } else {
          lines.push(value + ';')
        }
        lastLineWasComplete = true
        // line is incomplete, add what is there and flag it for the next loop
      } else {
        if (!lastLineWasComplete) {
          lastLine = lines[lines.length - 1]
          lines[lines.length - 1] = lastLine + ' ' + value
        } else {
          lines.push(value)
        }
        lastLineWasComplete = false
      }
    }
  })

  // create an object to hold of the module objects
  const modules = {}
  lines.forEach(function(value) {
    // don't want any blank imports
    if (value.trim().length > 0) {
      // need module name, as well as data about import
      const data = getData(value)
      if (!modules[data.path]) {
        modules[data.path] = data // create new module object
      } else {
        // add data to existing module object
        const newImports = data.imports
        // loop over all the new imports
        newImports.forEach(function(value) {
          // check if module already contains this import
          let alreadyContained = false
          modules[data.path].imports.forEach(function(existingValue) {
            if (existingValue.importName === value.importName) {
              alreadyContained = true
            }
          })
          if (!alreadyContained) {
            // this module doesn't exist yet, so add it
            modules[data.path].imports.push(value)
          }
        })
      }
    }
  })

  // sort imports and split into third party and internal imports
  const thirdPartyImports = []
  const internalImports = []
  for (const prop in modules) {
    const currentModule = modules[prop]
    currentModule.imports.sort(function(a, b) {
      return a.importName.toLowerCase().localeCompare(b.importName.toLowerCase())
    })
    if (currentModule.thirdParty) {
      thirdPartyImports.push(currentModule)
    } else {
      internalImports.push(currentModule)
    }
  }

  // sort modules by name
  const sorter = function(a, b) {
    if (a.imports.length === 0) {
      if (b.imports.length === 0) {
        // a and b both have no imports, so sort by module name
        const result = a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        if (result === 0) {
          return a.pathLength < b.pathLength ? -1 : 1
        }
        return result
      } else {
        // a has no imports but b does, so b comes first
        return 1
      }
    } else if (b.imports.length === 0) {
      // b has no imports but a does, so a comes first
      return -1
    }
    // a and b both have imports, so sort by module name
    const result = a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    if (result === 0) {
      return a.pathLength < b.pathLength ? -1 : 1
    }
    return result
  }
  thirdPartyImports.sort(sorter)
  internalImports.sort(sorter)

  // generate the final string
  let result = ''
  if (thirdPartyImports) {
    thirdPartyImports.forEach(function(value, index) {
      const importStr = generateImportString(value.imports, value.path, value.brackets)
      result += importStr + (index < thirdPartyImports.length - 1 ? '\n' : '')
    })
    result += internalImports ? '\n\n' : ''
  }
  if (internalImports) {
    internalImports.forEach(function(value, index) {
      const importStr = generateImportString(value.imports, value.path, value.brackets)
      result += importStr + (index < internalImports.length - 1 ? '\n' : '')
    })
  }

  return result.trim()
}

const getData = (str) => {
  // module data
  let moduleName = ''
  if (str.indexOf('\'') > -1) { // single quotes
    moduleName = str.substring(str.indexOf('\'') + 1, str.lastIndexOf('\''))
  } else { // double quotes
    moduleName = str.substring(str.indexOf('"') + 1, str.lastIndexOf('"'))
  }
  let firstModuleNameChar = moduleName.search(/[^\.\/]/)
  if (firstModuleNameChar === -1) { // only a relative path, no folder/file names
    firstModuleNameChar = moduleName.length
  }
  const prefixLength = moduleName.substr(0, firstModuleNameChar).length
  const moduleNameStripped = moduleName.substr(firstModuleNameChar).trim()

  // import data
  const aliases = []
  if (str.indexOf('{') > -1 && str.indexOf('}') > -1) {
    var brackets = true
    const imports = str.substring(str.indexOf('{') + 1, str.indexOf('}')).split(',')
    imports.forEach(function(value) {
      if (value.indexOf(' as ') > -1) {
        const data = value.split(' as ')
        aliases.push({ importName: data[0].trim(), alias: data[1].trim() })
      } else {
        aliases.push({ importName: value.trim() })
      }
    })
  } else {
    brackets = false
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
    brackets: brackets,
  }
}

const generateImportString = (imports, moduleName, useBrackets) => {
  let importStr = 'import ' + (useBrackets ? '{ ' : '')
  if (imports.length > 0) {
    imports.forEach(function(importValue, index) {
      importStr += importValue.importName + (importValue.alias ? ' as ' + importValue.alias : '') + (index < imports.length - 1 ? ', ' : '')
    })
    importStr += (useBrackets ? ' }' : '') + ' from \'' + moduleName + '\';'
  } else {
    importStr += '\'' + moduleName + '\';'
  }

  // limit line to 140 characters (TODO make this an option)
  return importStr.length > 140
    ? importStr.replace(/{ /, '{\n    ').replace(/, /g, ',\n    ').replace(/ }/, '\n}')
    : importStr
}
