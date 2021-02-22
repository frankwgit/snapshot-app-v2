import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderHistoryScreenStyle'
import moment from 'moment'
import { Images, Colors } from '../Themes'
import ImageLoad from 'react-native-image-placeholder'
import { showError } from '../Lib/Alert'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import Config from 'react-native-config'
import PhotoView from '@merryjs/photo-viewer'

const api = Api.create()

class OrderHistoryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      credits: {},
      orders: {
        items: []
      },
      isRefreshing: false,
      visible: false,
      photo: {}
    }
    this.onEndReachedCalledDuringMomentum = true
  }

  async componentDidMount () {
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    await this.getCredits()
    await this.getOrders()
    Loading.hide(loader)
  };

  async getCredits () {
    api.setToken(this.props.auth.token)
    const response = await api.getCredits()
    __DEV__ && console.log('getCredits response', response)
    if (response.ok) {
      this.setState({ credits: response.data })
    } else {
      showError({ message: 'Connection error' })
    }
  }

  async getOrders (isRefreshing) {
    if (this.state.isLoading) {
      return false
    }
    this.setState({ isLoading: true })
    api.setToken(this.props.auth.token)
    const query = {
      sortBy: 'createdDate',
      sortDir: 'desc',
      pageSize: 20,
      pageIndex: isRefreshing ? 1 : (this.state.orders.pageIndex || 0) + 1
    }
    const response = await api.getOrders(query)
    __DEV__ && console.log('getOrders response', response)
    if (response.ok) {
      if (!isRefreshing) {
        response.data.items = [...this.state.orders.items, ...response.data.items]
      }
      this.setState({ orders: response.data, isLoading: false })
    } else {
      this.setState({ isLoading: false })
      showError({ message: 'Connection error' })
    }
  }

  async onRefreshData () {
    this.setState({ isRefreshing: true })
    await this.getOrders(true)
    this.setState({ isRefreshing: false })
  }

  showPhoto (item) {
    const photo = {
      source: item.request.imageName ? { uri: `${this.props.images.imageUrl}${item.request.imageName}` } : Images.postcardFront
    }
    console.log(photo)
    this.setState({ visible: true, photo })
  }

  renderHeader () {
    return (
      <View style={styles.row}>
        <View style={styles.firstCol} />
        <View style={styles.secondCol}>
          <Text style={styles.headerText}>Order</Text>
        </View>
        <View style={styles.thirdCol}>
          <Text style={styles.headerText}>Recipient</Text>
        </View>
      </View>
    )
  }

  renderFooter () {
    const { pageIndex, pageSize, totalCount } = this.state.orders
    return pageIndex && pageSize * pageIndex < totalCount && (
      <TouchableOpacity onPress={() => this.getOrders()}>
        <Text style={styles.loadMore}>Show More...</Text>
      </TouchableOpacity>
    )
  }

  renderItem ({ item }) {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.firstCol} onPress={() => this.showPhoto(item)}>
          <ImageLoad
            source={item.request.imageName ? { uri: `${this.props.images.thumbUrl}${item.request.imageName}` } : Images.postcardFront}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.secondCol}>
          <Text style={styles.description}>Date: {moment.utc(item.createdDate).format('MM/DD/YYYY hh:mm A')}</Text>
          <Text style={styles.description}>Order: {item.orderNumber}</Text>
          <Text style={styles.description}>Status: {item.status.status}</Text>
        </View>
        <View style={styles.thirdCol}>
          {item.recipients.length > 1 && (
            <Text style={styles.recipientNumber}>{item.recipients.length} Recipients:</Text>
          )}
          {item.recipients.map((recipient, index) => (
            <View key={index.toString()}>
              <Text style={styles.description}>{recipient.mailingLabel}</Text>
              <Text style={styles.description}>{recipient.address1}</Text>
              <Text style={styles.description}>{recipient.city}, {recipient.state}</Text>
              <Text style={styles.description}>{recipient.postalCode || ''}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        style={styles.container}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={this.state.isRefreshing}
      //     onRefresh={this.onRefreshData.bind(this)}
      //     colors={[Colors.primary]}
      //     tintColor={Colors.primary}
      //   />
      // }
      >
        <Text style={styles.username}><Text style={styles.label}>User:</Text> {this.props.auth.user.email}</Text>
        <Text style={styles.username}><Text style={styles.label}>Activated:</Text> {moment.utc(this.props.auth.user.createdDate).format('MM/DD/YYYY hh:mm A')}</Text>

        <View style={styles.creditBlock}>
          <Text style={styles.credit}>Credits: </Text>
          <View>
            <Text style={styles.value}>{`   ${this.state.credits.purchased} Purchased`}</Text>
            <Text style={styles.value}>{`+ ${this.state.credits.free} Free / Promo`}</Text>
            <Text style={styles.value}>{`-  ${this.state.credits.used} Used`}</Text>
            <View style={styles.hr} />
            <Text style={styles.value}>{`= ${this.state.credits.available} available`}</Text>
          </View>
        </View>

        <FlatList
          data={this.state.orders.items}
          extraData={this.state.orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
          ListHeaderComponent={this.renderHeader()}
          ListFooterComponent={this.renderFooter()}
        />

        <PhotoView
          visible={this.state.visible}
          data={[this.state.photo]}
          hideStatusBar
          hideShareButton
          initial={0}
          onDismiss={() => {
            this.setState({ visible: false })
          }}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    images: state.images.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen)
