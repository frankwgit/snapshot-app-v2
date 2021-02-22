import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: Fonts.size.input
  },
  clear: {
    marginHorizontal: 5
  },
  country: {
    marginHorizontal: 5,
    fontSize: Fonts.size.input
  }
})
