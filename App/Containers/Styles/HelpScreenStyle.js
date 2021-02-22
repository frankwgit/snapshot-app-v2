import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  containerStyle: {
    paddingBottom: 60
  },
  topLabel: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },
  videoView: {
    width: Metrics.screenWidth - 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    marginTop: 10
  },
  label: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 20,
    marginHorizontal: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20
  },
  link: {
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#0381E7',
    marginTop: 5
  }
})
