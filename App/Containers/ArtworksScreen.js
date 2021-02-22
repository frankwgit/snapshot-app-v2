import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ArtworksScreenStyle'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

class ArtworksScreen extends Component {
  render () {
    const { artwork } = this.props
    return (
      <FlatList
        style={styles.container}
        numColumns={3}
        data={artwork.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.cell} onPress={() => Actions.photoView({
            images: artwork.images,
            selected: index,
            onSelect: this.props.onSelect
          })}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworksScreen)
