import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  username: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 14
  },
  label: {
    fontWeight: 'bold'
  },
  creditBlock: {
    marginVertical: 15,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  credit: {
    fontWeight: 'bold',
    fontSize: 14
  },
  value: {
    fontSize: 14
  },
  hr: {
    width: '100%',
    borderTopWidth: 1,
    marginVertical: 5
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa'
  },
  firstCol: {
    padding: 3,
    width: (Metrics.screenWidth - 2) / 3,
    height: '100%'
  },
  secondCol: {
    padding: 3,
    width: (Metrics.screenWidth - 2) / 3,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#aaa'
  },
  thirdCol: {
    padding: 3,
    width: (Metrics.screenWidth - 2) / 3,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#aaa'
  },
  image: {
    width: (Metrics.screenWidth - 2) / 3 - 6,
    height: ((Metrics.screenWidth - 2) / 3) * 3 / 4
  },
  description: {
    fontSize: 13
  },
  recipientNumber: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  loadMore: {
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 10
  }
})
