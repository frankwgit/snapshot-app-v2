import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  row: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    marginLeft: 10
  },
  rowText: {
    fontSize: 18
  }
})
