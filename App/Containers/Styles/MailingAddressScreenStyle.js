import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    height: 60,
    alignItems: 'center',
    paddingRight: 10
  },
  rowMiddle: {
    justifyContent: 'center',
    height: 60,
    marginRight: 10,
    flex: 1
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 10
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    flex: 1
  }
})
