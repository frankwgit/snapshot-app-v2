import { MessageBarManager } from 'react-native-message-bar'
import { Colors } from '../Themes'
import { RF } from './Utils'

export const showError = data => {
  const message = data && data.message
    ? data.message
    : 'Cannot connect to server'

  MessageBarManager.showAlert({
    viewTopInset: 40,
    title: '',
    message: message,
    alertType: 'error',
    stylesheetError: { backgroundColor: 'transparent', strokeColor: 'transparent' },
    messageStyle: { color: Colors.fire, fontSize: RF(4), textAlign: 'center' }
  })
}

export const showAlert = data => {
  const { message } = data
  MessageBarManager.showAlert({
    viewTopInset: 15,
    title: '',
    message: message,
    alertType: 'alert'
  })
}
