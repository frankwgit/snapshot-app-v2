import React, { Component } from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MailingAddressAddScreenStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Icon from 'react-native-vector-icons/EvilIcons'
import CountryPicker from 'react-native-country-picker-modal'
import { Actions } from 'react-native-router-flux'
import Contacts from 'react-native-contacts'
import merge from 'lodash/merge'

class MailingAddressAddScreen extends Component {
  constructor (props) {
    super(props)
    const address = props.address || {}
    this.state = {
      cca2: 'US',
      name: address.name,
      line1: address.line1,
      line2: address.line2,
      country: address.country || 'United States',
      state: address.state,
      city: address.city,
      zipcode: address.zipcode,
      contact: props.contact,
      isEdited: false
    }
  }

  componentDidMount = () => {
    const currentScene = Actions.currentScene
    setTimeout(() => {
      Actions.currentScene === currentScene && Actions.refresh({
        rightTitle: 'Add',
        onRight: () => this.onSave()
      })
      this.setState({ ready: true })
    }, 1000)
  }

  onSave () {
    if (!this.state.name) {
      Alert.alert('Name is required')
      return false
    } else if (!this.state.line1) {
      Alert.alert('Address line 1 required')
      return false
    } else if (!this.state.city) {
      Alert.alert('City is required')
      return false
    }
    Actions.pop()
    this.props.onSave(this.state)
  }

  getContactPress () {
    if (!this.state.ready) {
      return false
    }
    const currentScreen = Actions.currentScene
    Actions.contactPicker({
      onSelect: contact => {
        Actions.popTo(currentScreen)
        this.onSelectContact(contact)
      }
    })
  }

  onSelectContact (contact) {
    const lines = contact.address.street.split('\n')
    this.setState({
      name: `${contact.givenName || ''} ${contact.familyName || ''}`.trim(),
      line1: lines[0],
      line2: lines[1],
      country: contact.address.country,
      state: contact.address.state,
      city: contact.address.city,
      zipcode: contact.address.postCode,
      contact,
      isEdited: false
    })
  }

  updateContactPress () {
    Alert.alert(
      'Confirmation',
      'Do you want to update your phone book?',
      [
        {
          text: 'Ok',
          onPress: () => this.updateContact()
        },
        { text: 'Cancel' }
      ]
    )
  }

  updateContact () {
    const contact = this.state.contact
    const address = {
      street: [this.state.line1, this.state.line2].join('\n'),
      country: this.state.country || '',
      state: this.state.state || '',
      city: this.state.city || '',
      postCode: this.state.zipcode || ''
    }
    contact.postalAddresses[contact.index] = merge(contact.postalAddresses[contact.index], address)
    delete contact.address
    delete contact.index
    console.log(contact)
    Contacts.updateContact(contact, (err) => {
      if (err) {
        Alert.alert('Error while saving contact')
      } else {
        Alert.alert('Saved successfully')
      }
    })
  }

  createContactPress () {
    Alert.alert(
      'Confirmation',
      'Do you want to save contact your phone book?',
      [
        {
          text: 'Ok',
          onPress: () => this.createContact()
        },
        { text: 'Cancel' }
      ]
    )
  }

  createContact () {
    const address = {
      label: 'home',
      street: [this.state.line1 || '', this.state.line2 || ''].join('\n'),
      country: this.state.country || '',
      state: this.state.state || '',
      city: this.state.city || '',
      postCode: this.state.zipcode || ''
    }
    let names = this.state.name.split(' ')
    const givenName = names.slice(0, 1).join(' ')
    const familyName = names.slice(1).join(' ')
    const contact = {
      givenName,
      familyName,
      postalAddresses: [address]
    }
    console.log(contact)
    Contacts.addContact(contact, (err) => {
      if (err) {
        Alert.alert('Error while saving contact')
      } else {
        Alert.alert('Saved successfully')
      }
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='Name'
            value={this.state.name}
            onChangeText={text => this.setState({ name: text, isEdited: true })}
            autoCapitalize='words'
          />
          {!!this.state.name && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ name: '' })} />}
          <Ionicons name='ios-contact' size={30} color='#333' onPress={() => this.getContactPress()} />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='Address Line 1'
            value={this.state.line1}
            onChangeText={text => this.setState({ line1: text, isEdited: true })}
            autoCapitalize='sentences'
          />
          {!!this.state.line1 && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ line1: '' })} />}
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='Address Line 2'
            value={this.state.line2}
            onChangeText={text => this.setState({ line2: text, isEdited: true })}
            autoCapitalize='sentences'
          />
          {!!this.state.line2 && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ line2: '' })} />}
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='City'
            value={this.state.city}
            onChangeText={text => this.setState({ city: text, isEdited: true })}
            autoCapitalize='words'
          />
          {!!this.state.city && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ city: '' })} />}
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='State'
            value={this.state.state}
            onChangeText={text => this.setState({ state: text, isEdited: true })}
            autoCapitalize='characters'
          />
          {!!this.state.state && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ state: '' })} />}
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='Zipcode'
            value={this.state.zipcode}
            onChangeText={text => this.setState({ zipcode: text, isEdited: true })}
            keyboardType='numbers-and-punctuation'
          />
          {!!this.state.zipcode && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ zipcode: '' })} />}
          <CountryPicker
            onChange={value => {
              this.setState({ cca2: value.cca2, country: value.name, isEdited: true })
            }}
            cca2={this.state.cca2}
            filterable
            closeable
            filterPlaceholder='Search'
            animationType='slide'
          >
            <Text style={styles.country}>{this.state.country}</Text>
          </CountryPicker>
        </View>
        {this.state.contact
          ? (
            <TouchableOpacity style={styles.button} onPress={() => this.state.isEdited && this.updateContactPress()}>
              <Text style={[styles.buttonLabel, !this.state.isEdited ? { color: '#ccc' } : null]}>Update Contact</Text>
            </TouchableOpacity>
          )
          : !!this.state.name && (
            <TouchableOpacity style={styles.button} onPress={() => this.createContactPress()}>
              <Text style={styles.buttonLabel}>Create New Contact</Text>
            </TouchableOpacity>
          )}
      </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MailingAddressAddScreen)
