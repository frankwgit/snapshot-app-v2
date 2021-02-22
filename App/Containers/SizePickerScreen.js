import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SizePickerScreenStyle'
// import YourActions from '../Redux/YourRedux'
import Lightbox from '../Components/lightbox/BaseLightbox'
import { Actions } from 'react-native-router-flux'
import { RF } from '../Lib/Utils'

class SizePickerScreen extends Component {
  onSelect (item) {
    Actions.pop()
    this.props.onPick(item)
  }

  render () {
    const fonts = [10, 12, 14, 16, 20, 24, 26, 28, 30, 36, 42, 50]
    return (
      <Lightbox verticalPercent={0.9} horizontalPercent={0.9}>
        <FlatList
          style={styles.container}
          data={fonts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => this.onSelect(item)}>
              <Text style={[styles.item, { fontSize: RF(item / 4.5) }]}>{item}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SizePickerScreen)
