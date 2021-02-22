import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CreditActions from '../Redux/CreditRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/CreditsScreenStyle'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import { showError } from '../Lib/Alert'
import { Colors } from '../Themes'

const api = Api.create()

class CreditsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: null
    }
  }

  async componentDidMount () {
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    await this.getUrl()
    Loading.hide(loader)
  };

  async getUrl () {
    api.setToken(this.props.auth.token)
    const response = await api.getUrl()
    __DEV__ && console.log('Get URL response', response)
    if (response.ok) {
      const url = response.data.url
      this.setState({ url })
    } else {
      showError({ message: 'Connection error' })
    }
  }

  componentWillUnmount () {
    this.getCredits(this.props)
  }

  async getCredits (props) {
    if (props.auth.token) {
      api.setToken(props.auth.token)
      const response = await api.getCredits()
      __DEV__ && console.log('Get credit response', response)
      if (response.ok) {
        this.props.setCredit(response.data)
      } else {
        showError({ message: response.data.message || 'An error occurred when connecting with server' })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {!!this.state.url && (
          <WebView
            source={{ uri: this.state.url }}
            style={{ flex: 1 }}
            startInLoadingState
          />
        )}
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
    ...bindActionCreators(CreditActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditsScreen)
