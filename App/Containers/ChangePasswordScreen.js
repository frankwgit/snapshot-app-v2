import React, { Component } from 'react'
import { TextInput, Text, Image, View, TouchableOpacity, Platform, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'
import { Actions, ActionConst } from 'react-native-router-flux'
import Validator from '../Lib/Validator'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showError } from '../Lib/Alert'

const api = Api.create()

class ChangePasswordScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPassword: '',
      password: '',
      password_confirmation: '',
      errors: null
    }
  }

  onChangePasswordPress () {
    let rules = {
      currentPassword: 'required',
      password: 'required|confirmed'
    }
    let validation = new Validator(this.state, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    }
    this.setState({ errors: null })
    this.onChangePassword()
  }

  async onChangePassword () {
    const {
      currentPassword,
      password
    } = this.state
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    api.setToken(this.props.auth.token)
    const response = await api.changePassword({
      oldPassword: currentPassword,
      newPassword: password
    })
    __DEV__ && console.log('ChangePassword response', response)
    Loading.hide(loader)
    if (response.ok) {
      Actions.pop()
    } else {
      showError({ message: response.data })
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerContent}>
              <View style={styles.centered}>
                <Image source={Images.logo} style={styles.logo} />
              </View>

              <View style={styles.middleSection} >
                <TextInput
                  ref='inputCurrentPassword'
                  style={styles.input}
                  value={this.state.currentPassword}
                  placeholder='Current Password'
                  icon={Images.iconLock}
                  onChangeText={text => this.setState({ currentPassword: text })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  secureTextEntry
                  onSubmitEditing={() => this.refs.inputPassword.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('currentPassword')}</Text>

                <TextInput
                  ref='inputPassword'
                  style={styles.input}
                  value={this.state.password}
                  placeholder='Password'
                  icon={Images.iconLock}
                  onChangeText={text => this.setState({ password: text })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  secureTextEntry
                  onSubmitEditing={() => this.refs.inputPasswordConfirmation.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('password')}</Text>

                <TextInput
                  ref='inputPasswordConfirmation'
                  style={styles.input}
                  value={this.state.password_confirmation}
                  placeholder='Confirm Password'
                  icon={Images.iconLock}
                  onChangeText={text => this.setState({ password_confirmation: text })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  secureTextEntry
                  onSubmitEditing={() => this.onChangePasswordPress()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('password')}</Text>
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => this.onChangePasswordPress()}>
                <Text style={styles.loginText}>{'CHANGE'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
