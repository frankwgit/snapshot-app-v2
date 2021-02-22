import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    padding: 7,
    backgroundColor: Colors.snow
  },
  rowLabel: {
    flex: 1,
    color: '#555',
    fontSize: 16,
    marginLeft: 5
  },
  rowValue: {
    color: '#555',
    fontSize: 16,
    marginRight: 5,
    paddingHorizontal: 5
  },
  captionInput: {
    textAlignVertical: 'top',
    height: 150,
    width: Metrics.screenWidth - 20,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 10,
    margin: 10
  },
  clear: {
    position: 'absolute',
    top: 15,
    right: 15
  }
})
