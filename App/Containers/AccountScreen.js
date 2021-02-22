import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import CardActions from '../Redux/CardRedux'

import Icon from 'react-native-vector-icons/EvilIcons'
// Styles
import styles from './Styles/AccountScreenStyle'
import { ActionConst, Actions } from 'react-native-router-flux'

class AccountScreen extends Component {
  logout () {
    Alert.alert(
      'Confirmation',
      'Do you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.logout()
            this.props.resetCardData()
            setTimeout(() => {
              Actions.launch({ type: ActionConst.RESET })
            }, 300)
          }
        }
      ]
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.version}>Version 2.19</Text>
        <TouchableOpacity style={styles.row} onPress={() => Actions.credits()}>
          <Text style={styles.rowLabel}>Buy Credits</Text>
          <Icon name='chevron-right' size={25} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => Actions.orderHistory()}>
          <Text style={styles.rowLabel}>Order History</Text>
          <Icon name='chevron-right' size={25} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => Actions.changePassword()}>
          <Text style={styles.rowLabel}>Change Password</Text>
          <Icon name='chevron-right' size={25} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => this.logout()}>
          <Text style={styles.rowLabel}>Sign Out</Text>
          <Icon name='chevron-right' size={25} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => Actions.help()}>
          <Text style={styles.rowLabel}>Help</Text>
          <Icon name='chevron-right' size={25} color='#ccc' />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(AuthActions.logout, dispatch),
    resetCardData: bindActionCreators(CardActions.resetCardData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
