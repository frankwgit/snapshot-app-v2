import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import { RF } from '../../Lib/Utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  },
  navbarStyle: {
    backgroundColor: '#fff'
  },
  navTransparent: {
    borderBottomWidth: 0,
    elevation: 0
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 5
  },
  buttonTextStyle: {
    fontSize: 16,
    marginHorizontal: 5
  }
})
