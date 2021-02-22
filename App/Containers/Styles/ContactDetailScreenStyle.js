import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20
  },
  name: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20
  },
  rowLeft: {
    flex: 1
  },
  address: {
    fontSize: 18,
    marginTop: 5
  },
  map: {
    width: 100,
    height: 100,
    borderRadius: 3,
    marginLeft: 10
  }
})
