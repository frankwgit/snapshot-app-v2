import { Alert } from 'react-native'

export const showError = data => {
  const message = data && data.message
    ? data.message
    : 'Cannot connect to server'
  setTimeout(() => {
    Alert.alert('Error', message)
  }, 300)
}
