import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Gallery from 'react-native-image-gallery'
// Styles
import styles from './Styles/PhotoViewScreenStyle'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Colors } from '../Themes'
import ImageLoad from 'react-native-image-placeholder'

class PhotoViewScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.selected
    }
  }

  onSelect () {
    Actions.popTo('home')
    const item = this.props.images[this.state.selected]
    this.props.onSelect && this.props.onSelect(item.image)
  }

  render () {
    const images = _.map(this.props.images, image => ({ source: { uri: image.image } }))
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        <Gallery
          style={{ flex: 1, backgroundColor: this.props.backgroundColor || 'black' }}
          images={images}
          initialPage={this.state.selected}
          onPageSelected={(selected) => this.setState({ selected })}
          imageComponent={(props, dimentions) => (
            <ImageLoad
              {...props}
              loadingStyle={{ color: 'blue' }}
            />
          )}
        />
        <TouchableOpacity style={styles.checkButton} onPress={() => this.onSelect()}>
          <EvilIcons name='check' size={30} color={Colors.snow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={Actions.pop}>
          <EvilIcons name='close-o' size={30} color={Colors.snow} />
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewScreen)
