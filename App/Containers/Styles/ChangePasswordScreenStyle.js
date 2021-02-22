import { StyleSheet, StatusBar } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  containerContent: {
    paddingBottom: Metrics.baseMargin,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - (StatusBar.currentHeight || 0)
  },
  logo: {
    marginTop: 20,
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  icon: {
    ...ApplicationStyles.iconSmall
  },
  middleSection: {
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingBottom: 10,
    borderRadius: 5
  },
  input: {
    width: Metrics.screenWidth - 80,
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 5,
    fontSize: 18
  },
  error: {
    width: Metrics.screenWidth - 80,
    alignSelf: 'center',
    fontSize: 14,
    color: '#F75A51'
  },
  hr: {
    width: Metrics.screenWidth - 80,
    alignSelf: 'center',
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5
  },
  sectionText: {
    ...Fonts.style.description,
    color: Colors.primary,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: Metrics.screenWidth - 80,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  buttons: {
    marginHorizontal: Metrics.screenWidth / 9,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomSection: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  bottomSectionText: {
    ...Fonts.style.description,
    alignSelf: 'center'
  },
  signupText: {
    ...Fonts.style.normal,
    color: Colors.primary
  }
})
