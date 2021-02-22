import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CaptionScreenStyle'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/EvilIcons'
import tinycolor from 'tinycolor2'
import { RF } from '../Lib/Utils'
import Ionicons from 'react-native-vector-icons/Ionicons'

class CaptionScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      captionText: props.captionText,
      captionStyle: {
        fontFamily: 'Felt',
        fontSize: 20,
        color: 'white',
        ...props.captionStyle
      }
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
    this.props.onSave({
      captionText: this.state.captionText,
      captionStyle: this.state.captionStyle
    })
  }

  onClearPress () {
    Alert.alert(
      'Confirmation',
      'Do you want to clear all?',
      [
        { text: 'Clear All', onPress: () => this.setState({ captionText: '' }) },
        { text: 'Cancel' }
      ]
    )
  }

  getBackgroundColor (color) {
    return tinycolor(color).isDark()
      ? '#FAFAFA'
      : '#222'
  }

  render () {
    const { captionText, captionStyle } = this.state
    const { fontFamily, fontSize, color } = captionStyle
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Keyboard.dismiss()
              Actions.fontPicker({
                onPick: fontFamily => this.setState({
                  captionStyle: { ...this.state.captionStyle, fontFamily }
                })
              })
            }}
          >
            <Text style={styles.rowLabel}>Font</Text>
            <Text style={[styles.rowValue, { fontFamily }]}>{fontFamily}</Text>
            {fontFamily !== 'Felt' &&
              <Ionicons
                name='md-close-circle'
                size={25}
                color='rgba(0, 0, 0, 0.4)'
                onPress={() => this.setState({ captionStyle: { ...this.state.captionStyle, fontFamily: 'Felt' } })}
              />}
            <Icon name='chevron-right' size={25} color='#ccc' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Keyboard.dismiss()
              Actions.sizePicker({
                onPick: fontSize => this.setState({
                  captionStyle: { ...this.state.captionStyle, fontSize }
                })
              })
            }}
          >
            <Text style={styles.rowLabel}>Size</Text>
            <Text style={[styles.rowValue, { fontSize: RF(captionStyle.fontSize / 4.5) }]}>{fontSize}</Text>
            {fontSize !== 20 &&
              <Ionicons
                name='md-close-circle'
                size={25}
                color='rgba(0, 0, 0, 0.4)'
                onPress={() => this.setState({ captionStyle: { ...this.state.captionStyle, fontSize: 20 } })}
              />}
            <Icon name='chevron-right' size={25} color='#ccc' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Keyboard.dismiss()
              Actions.colorPicker({
                color: captionStyle.color,
                onPick: color => this.setState({
                  captionStyle: { ...this.state.captionStyle, color }
                })
              })
            }}
          >
            <Text style={styles.rowLabel}>Color</Text>
            <Text style={[styles.rowValue, { color, backgroundColor: this.getBackgroundColor(captionStyle.color) }]}>Caption Text</Text>
            {color !== '#fff' && color !== '#ffffff' &&
              <Ionicons
                name='md-close-circle'
                size={25}
                color='rgba(0, 0, 0, 0.4)'
                onPress={() => this.setState({ captionStyle: { ...this.state.captionStyle, color: '#fff' } })}
              />}
            <Icon name='chevron-right' size={25} color='#ccc' />
          </TouchableOpacity>
          <View>
            <TextInput
              style={[
                styles.captionInput,
                captionStyle,
                {
                  fontSize: RF(captionStyle.fontSize / 4.5),
                  backgroundColor: this.getBackgroundColor(captionStyle.color)
                }
              ]}
              multiline
              underlineColorAndroid='transparent'
              placeholder='Enter Caption'
              value={captionText}
              placeholderTextColor='#ccc'
              onChangeText={text => this.setState({ captionText: text })}
            />
            {!!captionText &&
              <Ionicons
                name='md-close-circle'
                size={25}
                color={tinycolor(captionStyle.color).isDark() ? 'rgba(0, 0, 0, 0.4)' : 'rgba(200, 200, 200, 0.4)'}
                style={styles.clear}
                onPress={() => this.onClearPress()}
              />}
          </View>
        </View >
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(CaptionScreen)
