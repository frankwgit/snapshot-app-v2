import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import AuthActions from '../Redux/AuthRedux'
import ImagesActions from '../Redux/ImagesRedux'
// import Loading from 'react-native-loader-overlay'
import Api from '../Services/Api'
import { showError } from '../Lib/Alert'
import Loading from 'react-native-loader-overlay'

const api = Api.create()

class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      ready: false
    }
  }

  componentDidMount () {
    this.loader = Loading.show({ loadingType: 'Spinner', overlayColor: 'transparent' })
    this.startup(this.props)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.startup(newProps)
  }

  async startup (props) {
    if (!props.startup.isStarting && this.state.isLoading) {
      this.setState({ isLoading: false })
      if (props.auth.token) {
        await this.refreshToken(props.auth.token)
      }
      await this.getBorders()
      await this.getArtworks()
      await this.getDefaultImages()
      setTimeout(() => {
        Loading.hide(this.loader)
        Actions.lightbox({ type: ActionConst.RESET })
      }, 300)
    }
  }

  async refreshToken (token) {
    const response = await api.validate(token)
    __DEV__ && console.log('Refresh token response', response)
    if (response.ok) {
      const token = response.data.token
      api.setToken(token)
      const userResponse = await api.getMe()
      console.log('get user response', userResponse)
      if (userResponse.ok) {
        const user = userResponse.data
        this.props.setAuth({ token, user })
      } else if (response.status === 401) {
        this.props.logout()
      }
    } else if (response.status === 401) {
      this.props.logout()
    }
  }

  async getBorders () {
    // api.setToken(this.props.auth.token)
    const response = await api.getBorders()
    __DEV__ && console.log('Get borders response', response)
    if (response.ok) {
      this.props.setBorders(response.data[0].images)
    } else {
      showError({ message: response.data.message || 'An error occurred when connecting with server' })
    }
  }

  async getArtworks () {
    // api.setToken(this.props.auth.token)
    const response = await api.getArtworks()
    __DEV__ && console.log('Get artworks response', response)
    if (response.ok) {
      this.props.setArtworks(response.data)
    } else {
      showError({ message: response.data.message || 'An error occurred when connecting with server' })
    }
  }

  async getDefaultImages () {
    // api.setToken(this.props.auth.token)
    const response = await api.getDefaultImages()
    __DEV__ && console.log('Get DefaultImages response', response)
    if (response.ok) {
      this.props.setDefaultImages(response.data)
    } else {
      showError({ message: response.data.message || 'An error occurred when connecting with server' })
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <Image source={Platform.OS === 'ios' ? { uri: 'LaunchImage' } : Images.splash} style={styles.backgroundImage} resizeMode='cover' />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startup: state.startup,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(AuthActions, dispatch),
    ...bindActionCreators(ImagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
