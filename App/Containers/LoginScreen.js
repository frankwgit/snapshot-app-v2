import React, { Component } from 'react'
import { TextInput, Text, Image, View, TouchableOpacity, Platform, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Actions, ActionConst } from 'react-native-router-flux'
import Validator from '../Lib/Validator'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import { bindActionCreators } from 'redux'
import AuthActions from '../Redux/AuthRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showError } from '../Lib/Alert'

const api = Api.create()

class LoginScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: null
    }
  }

  onSignInPress () {
    const { email, password } = this.state
    let rules = {
      email: 'required|email',
      password: 'required'
    }
    let validation = new Validator({ email, password }, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    }
    this.setState({ errors: null })
    this.onSignIn()
  }

  async onSignIn () {
    const { email, password } = this.state
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    const response = await api.login({ username: email, password })
    __DEV__ && console.log('Login response', response)
    Loading.hide(loader)
    if (response.ok) {
      const token = response.data.token
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
          ? 'Invalid email or password'
          : 'Cannot connect to server'
        showError({ message })
      }
    } else {
      const message = response.status === 401
        ? 'Invalid email or password'
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
                <TextInput
                  ref='inputEmail'
                  style={styles.input}
                  value={this.state.email}
                  placeholder='Your Email'
                  icon={Images.iconMail}
                  onChangeText={text => this.setState({ email: text })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onSubmitEditing={() => this.refs.inputPassword.focus()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />

                <Text style={styles.error} >{this.state.errors && this.state.errors.first('email')}</Text>
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
                  onSubmitEditing={() => this.onSignInPress()}

                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error} >{this.state.errors && this.state.errors.first('password')}</Text>

              </View>
              <TouchableOpacity onPress={Actions.forgot}>
                <Text style={styles.sectionText} >{'Forgot password'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={() => this.onSignInPress()}>
                <Text style={styles.loginText} >{'LOGIN'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomSection} onPress={() => Actions.pop()}>
                <Text style={styles.signupText} >New Account Sign Up</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
