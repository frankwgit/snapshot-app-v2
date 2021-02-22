import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  checkButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : 10,
    right: 0,
    padding: Metrics.baseMargin
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : 10,
    left: 0,
    padding: Metrics.baseMargin
  }
})
