import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  cell: {
    marginLeft: 5,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  image: {
    width: (Metrics.screenWidth - 20) / 3,
    height: (Metrics.screenWidth - 20) / 3
  }
})
