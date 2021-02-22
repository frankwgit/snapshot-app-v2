import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ReturnAddressScreenStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Icon from 'react-native-vector-icons/EvilIcons'
import CountryPicker from 'react-native-country-picker-modal'
import { Actions } from 'react-native-router-flux'

class ReturnAddressScreen extends Component {
  constructor (props) {
    super(props)
    const fromAddress = props.fromAddress || {}
    this.state = {
      cca2: 'US',
      name: fromAddress.name,
      line1: fromAddress.line1,
      line2: fromAddress.line2,
      country: fromAddress.country || 'United States',
      state: fromAddress.state,
      city: fromAddress.city,
      zipcode: fromAddress.zipcode
    }
  }

  componentDidMount = () => {
    const currentScene = Actions.currentScene
    setTimeout(() => {
      Actions.currentScene === currentScene && Actions.refresh({
        rightTitle: ' Done',
        onRight: () => this.onSave()
      })
      this.setState({ ready: true })
    }, 1000)
  }

  onSave () {
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
      country: contact.address.country || 'USA',
      state: contact.address.state,
      city: contact.address.city,
      zipcode: contact.address.postCode
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='Your Name'
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
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
            onChangeText={text => this.setState({ line1: text })}
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
            onChangeText={text => this.setState({ line2: text })}
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
            onChangeText={text => this.setState({ city: text })}
            autoCapitalize='words'
          />
          {!!this.state.city && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ city: '' })} />}
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            placeholder='State'
            value={this.state.state}
            onChangeText={text => this.setState({ state: text })}
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
            onChangeText={text => this.setState({ zipcode: text })}
            keyboardType='numbers-and-punctuation'
          />
          {!!this.state.zipcode && <Ionicons name='md-close-circle' size={20} color='rgba(0,0,0,0.1)' style={styles.clear} onPress={() => this.setState({ zipcode: '' })} />}
          <CountryPicker
            onChange={value => {
              this.setState({ cca2: value.cca2, country: value.name })
            }}
            cca2={this.state.cca2}
            filterable
            closeable
            autoFocusFilter={false}
            filterPlaceholder='Search'
            animationType='slide'
          >
            <Text style={styles.country}>{this.state.country}</Text>
          </CountryPicker>
        </View>
        {/* <Icon name='chevron-right' size={25} color='#ccc' /> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ReturnAddressScreen)
