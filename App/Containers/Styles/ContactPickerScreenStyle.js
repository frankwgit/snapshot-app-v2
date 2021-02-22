import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.snow
  },
  groupHeader: {
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#eee',
    paddingLeft: 10
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    padding: 10
  },
  name: {
    marginHorizontal: 10,
    fontSize: Fonts.size.input,
    color: '#999'
  }
})
