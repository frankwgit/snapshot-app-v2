import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'
import { RF } from '../../Lib/Utils'

const cardWidth = Metrics.screenWidth - 30
const cardHeight = (Metrics.screenWidth - 30) * 3 / 4

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1
    // width: Metrics.screenWidth,
    // height: Metrics.screenHeight - Metrics.navBarHeight
  },
  backgroundImage: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  credit: {
    fontSize: RF(5),
    fontStyle: 'italic',
    textAlign: 'right',
    marginVertical: 20,
    marginHorizontal: 20,
    color: '#555555'
  },
  card: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 3 / 4
  },
  cardMain: {
    width: cardWidth,
    height: cardHeight,
    alignSelf: 'center'
  },
  cardBackground: {
    position: 'absolute',
    top: 5,
    left: 20,
    width: cardWidth,
    height: cardHeight
  },
  cardImage: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight
  },
  cardBorder: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight
  },
  cardFront: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#ccc',
    overflow: 'hidden'
  },
  cardBack: {
    width: cardWidth,
    height: cardHeight,
    flexDirection: 'row',
    backgroundColor: '#ccc'
  },
  messageWrap: {
    width: cardWidth / 2,
    height: cardHeight
  },
  messageImage: {
    width: (Metrics.screenWidth - 60) / 2 - 10,
    height: cardHeight * 2 / 3,
    marginTop: cardHeight * 0.20,
    marginHorizontal: 10
  },
  messageText: {
    width: (Metrics.screenWidth - 60) / 2 - 10,
    // height: cardHeight * 2 / 3,
    marginTop: cardHeight * 0.20,
    marginHorizontal: Metrics.screenWidth * 2 / 100,
    fontSize: RF(2.7),
    lineHeight: RF(3.2),
    letterSpacing: Metrics.screenWidth * 0.2 / 100,
    fontFamily: 'Felt'
  },
  addresses: {
    width: cardWidth / 2,
    height: cardHeight * 0.65,
    marginTop: cardHeight * 0.20,
    paddingHorizontal: 20
  },
  fromAddressWrap: {
    flex: 4
    // backgroundColor: '#ccc'
  },
  toAddressWrap: {
    flex: 6
    // backgroundColor: '#555'
  },
  fromLabel: {
    fontSize: RF(3)
  },
  toLabel: {
    marginTop: 10,
    fontSize: RF(3.5)
  },
  fromAddressImage: {
    marginTop: 5,
    width: cardWidth / 4,
    height: cardWidth / 8
  },
  fromAddressText: {
    width: cardWidth / 2.2,
    height: cardHeight / 5 + 10,
    fontSize: RF(2.5),
    marginTop: 5,
    marginLeft: '5%'
  },
  toAddressImage: {
    marginTop: 5,
    width: cardWidth / 3,
    height: cardWidth / 6
  },
  toAddressText: {
    width: cardWidth / 2.2,
    height: cardHeight / 5 + 10,
    fontSize: RF(3),
    marginTop: 5,
    marginLeft: '5%'
  },

  captionWrap: {
    top: cardHeight * 0.85,
    left: cardWidth * 0.03,
    position: 'absolute'
  },
  captionWrapPortrait: {
    position: 'absolute',
    top: 0,
    left: cardWidth * 0.92
  },
  caption: {
    width: cardWidth * 0.94
  },
  captionPortrait: {
    width: cardHeight * 0.9,
    left: -cardHeight * 0.36,
    top: cardHeight * 0.4,
    transform: [{ rotate: '-90deg' }]
  },

  helpText: {
    fontSize: RF(4),
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#555555'
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 20
  },

  fotterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Metrics.screenWidth
  },

  footerButton: {
    alignItems: 'center'
  },
  footerIcon: {
    width: 25,
    height: 25
  },
  footerText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
    width: Metrics.screenWidth / 5,
    textAlign: 'center'
  }
})
