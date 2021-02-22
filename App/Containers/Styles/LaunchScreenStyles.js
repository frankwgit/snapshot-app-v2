import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  mainContainer: {
    // paddingBottom: Metrics.baseMargin,
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    flex: 1
  }
})
