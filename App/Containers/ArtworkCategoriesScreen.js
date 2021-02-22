import React, { Component } from 'react'
import { Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions } from 'react-native-router-flux'
// Styles
import styles from './Styles/ArtworkCategoriesScreenStyle'

class ArtworkCategoriesScreen extends Component {
  render () {
    const { artworks } = this.props
    return (
      <FlatList
        style={styles.container}
        data={artworks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => Actions.artworks({
            artwork: item,
            onSelect: this.props.onSelect,
            title: item.name
          })}>
            <Text style={styles.rowText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artworks: state.images.artworks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkCategoriesScreen)
