import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Lightbox from '../Components/lightbox/BaseLightbox'
// Styles
import styles from './Styles/FontPickerScreenStyle'
import { Actions } from 'react-native-router-flux'

class FontPickerScreen extends Component {
  onSelect (item) {
    Actions.pop()
    this.props.onPick(item)
  }

  render () {
    const fonts = 'Arial,Arial-ItalicMT,Badaboom BB,Felt,Optima,Rage Italic,Times New Roman,Hand Of Sean'.split(',')
    return (
      <Lightbox verticalPercent={0.9} horizontalPercent={0.9}>
        <FlatList
          style={styles.container}
          data={fonts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => this.onSelect(item)}>
              <Text style={[styles.item, { fontFamily: item }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Lightbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(FontPickerScreen)
