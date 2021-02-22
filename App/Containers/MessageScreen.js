import React, { Component } from 'react'
import { View, Alert, TextInput, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MessageScreenStyle'
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { showError } from '../Lib/Alert'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RF } from '../Lib/Utils'

class MessageScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: props.message
    }
  }

  componentWillMount () {
    Actions.refresh({
      rightTitle: ' Save',
      onRight: () => this.onSave()
    })
  }

  onSave () {
    Actions.pop()
    this.props.onSave(this.state.message)
  }

  onClearPress () {
    Alert.alert(
      'Confirmation',
      'Do you want to clear all?',
      [
        { text: 'Clear All', onPress: () => this.setState({ message: '' }) },
        { text: 'Cancel' }
      ]
    )
  }

  onSizeChange (nativeEvent) {
    if (nativeEvent.layout.height > RF(4) * 14 + RF(7)) {
      showError({ message: 'Only 14 lines allowed.' })
    }
  }

  render () {
    const { message } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.inputContainer}
          contentContainerStyle={styles.inputContentContainer}
        >
          <TextInput
            style={styles.input}
            multiline
            underlineColorAndroid='transparent'
            placeholder='Enter Message'
            value={message}
            placeholderTextColor='#ccc'
            onChangeText={text => this.setState({ message: text })}
            onLayout={e => this.onSizeChange(e.nativeEvent)}
          />
          {!!message && <Ionicons name='md-close-circle' size={25} color='rgba(0, 0, 0, 0.4)' style={styles.clear} onPress={() => this.onClearPress()} />}
          <Text style={styles.cutoff}> --------- Message Cutoff --------- </Text>
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
