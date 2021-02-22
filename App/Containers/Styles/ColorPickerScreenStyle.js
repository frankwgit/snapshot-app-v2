import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth * 0.8
  },
  sectionText: {
    color: '#222',
    fontSize: 22,
    lineHeight: 28,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  },
  componentText: {
    marginTop: 16,
    color: '#222',
    fontSize: 16,
    lineHeight: 21,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: -0.408
      }
    })
  },
  colorPreview: {
    marginLeft: 12,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25
  },
  gradient: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 16,
    height: 4
  },
  sliderRow: {
    alignSelf: 'stretch',
    // marginLeft: 12,
    marginTop: 12,
    backgroundColor: '#fcfcfc'
  },
  colorString: {
    fontSize: 34,
    lineHeight: 41,
    ...Platform.select({
      android: {
        fontFamily: 'monospace'
      },
      ios: {
        fontFamily: 'Courier New',
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  },
  colorCell: {
    width: (Metrics.screenWidth * 0.8 - 60) / 5,
    height: (Metrics.screenWidth * 0.8 - 60) / 5,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  }
})
