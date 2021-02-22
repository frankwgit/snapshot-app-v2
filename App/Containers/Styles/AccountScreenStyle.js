import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  version: {
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'right',
    margin: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: Colors.snow
  },
  rowLabel: {
    flex: 1,
    color: '#555',
    fontSize: 18,
    marginLeft: 5
  }
})
