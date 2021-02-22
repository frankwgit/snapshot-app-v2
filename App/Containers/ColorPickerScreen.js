import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Lightbox from '../Components/lightbox/BaseLightbox'
// Styles
import styles from './Styles/ColorPickerScreenStyle'
import { Actions } from 'react-native-router-flux'
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider
} from 'react-native-color'
import tinycolor from 'tinycolor2'

class ColorPickerScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: { ...tinycolor(props.color).toHsl(), s: 100 }
    }
  }

  onPick (color) {
    Actions.pop()
    this.props.onPick(color)
  }

  updateHue = h => this.setState({ color: { ...this.state.color, h } }, () => this.props.onPick(tinycolor(this.state.color).toHex8String()));
  updateSaturation = s => this.setState({ color: { ...this.state.color, s } }, () => this.props.onPick(tinycolor(this.state.color).toHex8String()));
  updateLightness = l => this.setState({ color: { ...this.state.color, l } }, () => this.props.onPick(tinycolor(this.state.color).toHex8String()));
  onPressColorCell = color => this.setState({ color: tinycolor(color).toHsl() }, () => this.props.onPick(tinycolor(this.state.color).toHex8String()));

  render () {
    const backgroundColor = tinycolor(this.state.color).isDark()
      ? '#FAFAFA'
      : '#222222'
    return (
      <Lightbox verticalPercent={0.9} horizontalPercent={0.9}>
        <View style={styles.container}>
          <View style={[
            styles.colorPreview,
            { backgroundColor }
          ]}>
            <Text style={[styles.sectionText, { color: tinycolor(this.state.color).toHslString() }]}>Example Text</Text>
          </View>
          <Text style={styles.componentText}>{'Hue'}</Text>
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          />
          {/* <Text style={styles.componentText}>{'Saturation'}</Text>
          <SaturationSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.updateSaturation}
          /> */}
          <Text style={styles.componentText}>{'Lightness'}</Text>
          <LightnessSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.updateLightness}
          />
          <FlatList
            data={['black', 'white', 'gray', 'blue', 'green', 'red', 'yellow', 'magenta', 'orange', 'purple', 'brown', 'pink', '#69AEE1', '#F7CAAB', '#89D0C9', '#7FBD52', '#FDF2A2', '#FAEBD9', '#1E1F26', '#DDA294', '#FDCA6D', '#834444', '#4B3833', '#FB8D97', '#CD1D47']}
            keyExtractor={(item, index) => index.toString()}
            numColumns={5}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.colorCell, { backgroundColor: item }]}
                onPress={() => this.onPressColorCell(item)}
              />
            )}
          />
        </View>
      </Lightbox >
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerScreen)
