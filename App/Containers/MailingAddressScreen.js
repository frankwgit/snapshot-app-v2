import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MailingAddressScreenStyle'
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SortableListView from 'react-native-sortable-listview'

class MailingAddressScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toAddresses: props.toAddresses || []
    }
  }

  componentWillMount = () => {
    setTimeout(() => {
      Actions.refresh({
        leftTitle: 'Clear',
        onLeft: () => Alert.alert(
          'Confirmation',
          'Are you sure you want to clear mailing list?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                this.setState({ toAddresses: [] })
                this.props.onChangeAddresses([])
              }
            }
          ]
        ),
        rightTitle: 'Done',
        onRight: () => Actions.pop()
      })
    }, 300)
  }

  onAddRecieve (contact) {
    const toAddresses = [...this.state.toAddresses, contact]
    this.setState({ toAddresses })
    this.props.onChangeAddresses(toAddresses)
  }

  onRemovePress (index) {
    const contact = this.state.toAddresses[index]
    Alert.alert(
      'Confirmation',
      `Do you want to remove ${contact.name}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const toAddresses = this.state.toAddresses
            toAddresses.splice(index, 1)
            this.setState({ toAddresses })
            this.props.onChangeAddresses(toAddresses)
          }
        }
      ]
    )
  }

  onAddressBookPress () {
    const currentScreen = Actions.currentScene
    Actions.contactPicker({
      onSelect: (contact) => {
        const lines = contact.address.street.split('\n')
        Actions.popTo(currentScreen)
        Actions.mailingAddressAdd({
          address: {
            name: `${contact.givenName || ''} ${contact.familyName || ''}`.trim(),
            line1: lines[0],
            line2: lines[1],
            country: contact.address.country || 'USA',
            state: contact.address.state,
            city: contact.address.city,
            zipcode: contact.address.postCode
          },
          contact: contact,
          onSave: contact => this.onAddRecieve(contact)
        })
      }
    })
  }

  onAddressPress (address, index) {
    Actions.mailingAddressAdd({
      address,
      onSave: address => {
        const toAddresses = this.state.toAddresses
        toAddresses[index] = address
        this.setState({ toAddresses })
        this.props.onChangeAddresses(toAddresses)
      }
    })
  }

  renderRow (props, _, index) {
    return (
      <TouchableHighlight {...props.sortHandlers} underlayColor={'#eee'}>
        <View
          style={styles.row}
        >
          <Ionicons name='ios-remove-circle' size={30} color='#F42230' style={styles.icon} onPress={() => this.onRemovePress(index)} />
          <TouchableOpacity style={styles.rowMiddle} onPress={() => this.onAddressPress(props, index)}>
            <Text style={styles.rowTitle}>{props.name}</Text>
          </TouchableOpacity>
          <Ionicons name='ios-reorder' size={30} color='#ccc' />
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const data = this.state.toAddresses
    let order = Object.keys(data)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => Actions.mailingAddressAdd({
            onSave: contact => this.onAddRecieve(contact)
          })}>
          <Ionicons name='ios-add-circle' size={30} color='#56D25C' style={styles.icon} />
          <Text style={styles.rowTitle}>Add Recipient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.onAddressBookPress()}>
          <Ionicons name='ios-add-circle' size={30} color='#56D25C' style={styles.icon} />
          <Text style={styles.rowTitle}>Address Book</Text>
        </TouchableOpacity>
        {
          data.length
            ? (
              <SortableListView
                style={styles.list}
                data={data}
                renderRow={this.renderRow.bind(this)}
                order={order}
                onRowMoved={e => {
                  order.splice(e.to, 0, order.splice(e.from, 1)[0])
                  this.forceUpdate()
                }}
                ListFooterComponent={<Text>--</Text>}
              />
            )
            : (
              <View style={styles.row}>
                <Text style={styles.footerText}>Tab options above to add recipients for this card</Text>
              </View>
            )
        }
      </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(MailingAddressScreen)
