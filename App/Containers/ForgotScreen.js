import React, { Component } from 'react'
import { TextInput, Text, Image, View, TouchableOpacity, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
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

  onSubmitPress () {
    const { email } = this.state
    let rules = {
      email: 'required|email'
    }
    let validation = new Validator({ email }, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    }
    this.setState({ errors: null })
    this.onSubmit()
  }

  async onSubmit () {
    const { email } = this.state
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    const response = await api.forgot({ email })
    __DEV__ && console.log('Forgot response', response)
    Loading.hide(loader)
    if (response.ok) {
      setTimeout(() => {
        Alert.alert('Email Sent', 'We just sent a message to your email. Please check your inbox')
        Actions.pop()
      }, 300)
    } else {
      const message = response.status === 400
        ? 'Invalid email'
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
                  onSubmitEditing={() => this.onSubmitPress()}
                  underlineColorAndroid='transparent'
                />
                <View style={styles.hr} />
                <Text style={styles.error}>{this.state.errors && this.state.errors.first('email')}</Text>
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => this.onSubmitPress()}>
                <Text style={styles.loginText}>{'SEND'}</Text>
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
