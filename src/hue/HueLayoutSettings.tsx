import * as React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { DarkModeColorScheme } from './Hue'
import styles from './scss/Hue.scss'

interface ColorSchemeOption {
  name: string
  value: DarkModeColorScheme
}

interface Props {
  closeModal: () => void
  toggleDarkMode: (e: React.ChangeEvent) => void
  selectDarkModeColorScheme: (darkModeColorScheme: DarkModeColorScheme) => () => void
  isDarkMode: boolean
  darkModeColorScheme: DarkModeColorScheme
}

export default class HueLayoutSettings extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {
      closeModal,
      toggleDarkMode,
      selectDarkModeColorScheme,
      isDarkMode,
      darkModeColorScheme,
    } = this.props

    const darkModeColorSchemes = [
      {
        name: 'red',
        value: DarkModeColorScheme.RED,
      },
      {
        name: 'green',
        value: DarkModeColorScheme.GREEN,
      },
      {
        name: 'blue',
        value: DarkModeColorScheme.BLUE,
      },
      {
        name: 'orange',
        value: DarkModeColorScheme.ORANGE,
      },
    ]

    return (
      <Modal
        show={true}
        onHide={closeModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Hue Layout Settings</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Check
                custom
                type='checkbox'
                id='hue-dark-mode-checkbox'>
                <Form.Check.Input
                  type='checkbox'
                  onChange={toggleDarkMode}
                  checked={isDarkMode}
                  id='hue-dark-mode-checkbox' />
                <Form.Check.Label>Dark mode</Form.Check.Label>
              </Form.Check>

              <hr />

              <Form.Group>
                <Form.Label>Dark Mode color scheme</Form.Label>
                {darkModeColorSchemes.map(({ name, value }: ColorSchemeOption) => (
                  <Form.Check
                    key={value}
                    type='radio'
                    label={name}
                    onChange={selectDarkModeColorScheme(value)}
                    checked={value === darkModeColorScheme}
                    name='darkModeColorScheme'
                    disabled={!isDarkMode}
                    className={styles.hue__layoutSettings__radioInput}
                    id={`dark-mode-color-option-${name}`} />
                ))}
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant='primary'
              onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
