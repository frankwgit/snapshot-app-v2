import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BordersScreenStyle'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

class BordersScreen extends Component {
  render () {
    const { borders } = this.props

    return (
      <FlatList
        style={styles.container}
        numColumns={3}
        data={borders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.cell} onPress={() => {
            if (index === 0) {
              Actions.pop()
              this.props.onSelect()
            } else {
              Actions.pop()
              this.props.onSelect(item.image)
              // Actions.photoView({
              //   images: borders,
              //   selected: index,
              //   onSelect: this.props.onSelect,
              //   backgroundColor: '#555'
              // })
            }
          }}>
            <ImageLoad
              loadingStyle={{ color: 'blue' }}
              source={{ uri: item.thumb }} style={styles.image}
              resizeMode='cover'
            />
          </TouchableOpacity>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    borders: state.images.borders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BordersScreen)
