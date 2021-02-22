import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ContactDetailScreenStyle'
import UserAvatar from 'react-native-user-avatar'
import { Actions } from 'react-native-router-flux'

class ContactDetailScreen extends Component {
  onSelectAddress (address, index) {
    this.props.onSelect({ ...this.props.contact, address, index })
  }

  render () {
    const { contact } = this.props
    return (
      <ScrollView style={styles.container}>
        <UserAvatar style={styles.avatar} size='90' name={`${contact.givenName} ${contact.familyName}`} src={contact.thumbnailPath} />
        <Text style={styles.name}>
          {contact.givenName} {contact.familyName}
        </Text>
        <FlatList
          data={contact.postalAddresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.row} onPress={() => this.onSelectAddress(item, index)}>
              <View style={styles.rowLeft}>
                <Text style={styles.label}>{item.label.toUpperCase()}</Text>
                <Text style={styles.address}>{item.street} {item.city} {item.state} {item.postCode} {item.country}</Text>
              </View>
              <Image style={styles.map} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?size=100x100&zoom=12&scale=2&markers=color:red|${item.street},${item.city},${item.state}` }} resizeMode='cover' />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailScreen)
