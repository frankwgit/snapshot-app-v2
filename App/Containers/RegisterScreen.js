import React, { Component } from 'react'
import { TextInput, Text, Image, View, TouchableOpacity, Platform, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/RegisterScreenStyle'
import { Actions, ActionConst } from 'react-native-router-flux'
import Validator from '../Lib/Validator'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import { bindActionCreators } from 'redux'
import AuthActions from '../Redux/AuthRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showError } from '../Lib/Alert'

const api = Api.create()

class RegisterScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // firstName: '',
      // lastName: '',
      // phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: null
    }
  }

  onRegisterPress () {
    let rules = {
      // firstName: 'required',
      // lastName: 'required',
      // phone: 'required',
      email: 'required|email',
      password: 'required|confirmed'
    }
    let validation = new Validator(this.state, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    }
    this.setState({ errors: null })
    this.onRegister()
  }

  async onRegister () {
    const {
      // firstName,
      // lastName,
      // phone,
      email,
      password
    } = this.state
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    const response = await api.register({
      applicationID: 1,
      userName: email,
      // firstName,
      // lastName,
      // phone,
      email,
      password
    })
    __DEV__ && console.log('Register response', response)
    Loading.hide(loader)
    if (response.ok) {
      const token = response.data.token
      if (token) {
        api.setToken(token)
        const userResponse = await api.getMe()
        console.log('get user response', userResponse)
        if (userResponse.ok) {
          const auth = {
            user: userResponse.data,
            token
          }
          this.props.setAuth(auth)
          Actions.popTo('home')
        } else {
          const message = response.status === 401
            ? 'Invalid login'
            : 'Cannot connect to server'
          showError({ message })
        }
      }
    } else {
      const message = response.status === 401
        ? 'Username already registered by other one'
        : 'Cannot connect to server'
      showError({ message })
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
                {/* <TextInput
                  ref='inputFirstName'
                  style={styles.input}
                  value={this.state.firstName}
                  placeholder='First Name'
                  onChangeText={text => this.setState({ firstName: text })}
                  autoCorrect={false}
                  autoCapitalize={'words'}
                  onSubmitEditing={() => this.refs.inputLastName.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('firstName')}</Text>

                <TextInput
                  ref='inputLastName'
                  style={styles.input}
                  value={this.state.lastName}
                  placeholder='Last Name'
                  onChangeText={text => this.setState({ lastName: text })}
                  autoCorrect={false}
                  autoCapitalize={'words'}
                  onSubmitEditing={() => this.refs.inputPhone.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('lastName')}</Text>

                <TextInput
                  ref='inputPhone'
                  style={styles.input}
                  value={this.state.phone}
                  placeholder='Phone Number'
                  onChangeText={text => this.setState({ phone: text })}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => this.refs.inputEmail.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('phone')}</Text> */}

                <TextInput
                  ref='inputEmail'
                  style={styles.input}
                  value={this.state.email}
                  placeholder='Your Email'
                  onChangeText={text => this.setState({ email: text })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onSubmitEditing={() => this.refs.inputPassword.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('email')}</Text>

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
                  onSubmitEditing={() => this.onRegisterPress()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('password')}</Text>
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => this.onRegisterPress()}>
                <Text style={styles.loginText}>{'NEW ACCOUNT'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomSection} onPress={() => Actions.login()}>
                <Text style={styles.signupText}>Have an account? Sign In</Text>
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
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
