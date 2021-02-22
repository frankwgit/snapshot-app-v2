import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, Linking, Platform, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ContactPickerScreenStyle'
import AtoZList from 'react-native-atoz-listview'
import Contacts from 'react-native-contacts'
import _ from 'lodash'
import UserAvatar from 'react-native-user-avatar'
import { Actions } from 'react-native-router-flux'
import Permissions from 'react-native-permissions'

class ContactPickerScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: {}
    }
  }

  async componentDidMount () {
    await this.checkPermission()
  }

  async checkPermission () {
    const response = await Permissions.check('contacts')
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    if (Platform.OS === 'ios' && (response === 'denied' || response === 'restricted')) {
      Actions.pop()
      Alert.alert('Permission required',
        'To continue please enable Contacts from the phone settings page Settings > Postcard > Contacts',
        [
          {
            text: 'Ok',
            onPress: () => Platform.OS === 'ios' && Linking.openURL('app-settings:')
          }
        ]
      )
      return false
    }
    const permissionResponse = await Permissions.request('contacts')
    if (permissionResponse === 'authorized') {
      this.getContacts()
    } else {
      Alert.alert('Permission required',
        'Can not access to Contacts'
      )
      Actions.pop()
    }
  }

  getContacts () {
    Contacts.getAll((err, contacts) => {
      if (err) {
        this.setState({ error: 'Cannot get contact' })
      } else {
        const groupedContacts = _(contacts)
          .map(contact => {
            contact.name = ((contact.familyName || '') + (contact.givenName || '')).toUpperCase()
            return contact
          })
          .filter(contact => !!contact.name)
          .sortBy('name')
          .groupBy(contact => contact.name.substr(0, 1))
          .value()
        this.setState({ contacts: groupedContacts })
      }
    })
  }

  renderHeader (data) {
    return (
      <View style={styles.groupHeader}>
        <Text>{data.sectionId}</Text>
      </View>
    )
  }

  renderCell (row) {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => Actions.contactDetail({
          contact: row,
          onSelect: this.props.onSelect
        })}>
        <UserAvatar size='50' name={`${row.givenName} ${row.familyName}`} src={row.thumbnailPath} />
        <Text style={[styles.name, row.postalAddresses && row.postalAddresses.length ? { fontWeight: 'bold', color: '#000' } : null]}>
          {row.givenName} {row.familyName}
        </Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { contacts } = this.state
    return (
      <View style={styles.container}>
        <AtoZList
          contentContainerStyle={{ paddingBottom: 50 }}
          sectionHeaderHeight={20}
          rowHeight={60}
          data={contacts}
          renderRow={this.renderCell.bind(this)}
          footerHeigh={50}
        />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPickerScreen)
