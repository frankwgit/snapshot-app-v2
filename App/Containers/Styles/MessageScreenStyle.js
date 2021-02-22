import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'
import { RF } from '../../Lib/Utils'

const cardWidth = Metrics.screenWidth - 30

export default StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    width: Metrics.screenWidth
  },
  inputContentContainer: {
    marginTop: RF(5),
    marginHorizontal: RF(10),
    padding: RF(5),
    minHeight: RF(60),
    backgroundColor: Colors.snow
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: RF(4),
    lineHeight: RF(4.2),
    letterSpacing: RF(0.5),
    fontFamily: 'Felt'
  },
  clear: {
    position: 'absolute',
    top: 5,
    right: 10
  },
  cutoff: {
    position: 'absolute',
    top: RF(4) * 14 + RF(7),
    alignSelf: 'center',
    color: Colors.bloodOrange,
    fontSize: RF(3)
  }
})
