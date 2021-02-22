import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ImageStore,
  Alert,
  Linking,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import { bindActionCreators } from 'redux'
import CreditActions from '../Redux/CreditRedux'
import CardActions from '../Redux/CardRedux'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Images, Colors, Metrics } from '../Themes'
import { Actions } from 'react-native-router-flux'
// import _ from 'lodash'
// import { showError } from '../Lib/Alert'
import Loading from 'react-native-loader-overlay'
import Api from '../Services/Api'
import FlipComponent from 'react-native-flip-component'
import Gestures from 'react-native-easy-gestures'
import ActionSheet from 'react-native-actionsheet'
import RNShakeEvent from 'react-native-shake-event'
import ViewShot from 'react-native-view-shot'
import SafeAreaView from 'react-native-safe-area-view'
import { showError } from '../Lib/Alert'
import Config from 'react-native-config'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import ImageResizer from 'react-native-image-resizer'
import ImageLoad from 'react-native-image-placeholder'
import Permissions from 'react-native-permissions'
import { RF } from '../Lib/Utils'

const cardWidth = Metrics.screenWidth - 30
const cardHeight = (Metrics.screenWidth - 30) * 3 / 4
const api = Api.create()

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    const data = props.data.asMutable({ deep: true })
    this.state = {
      isFlipped: false,
      captionText: data.captionText,
      message: data.message,
      fromAddress: data.fromAddress,
      toAddresses: data.toAddresses,
      cardImage: data.cardImage,
      cardBorder: data.cardBorder,
      isPortrait: data.isPortrait,
      captionStyle: data.captionStyle || {
        color: '#fff',
        fontSize: 20
      },
      width: data.width || cardWidth,
      height: data.height || cardHeight,
      gestureStyle: null,
      helpText: 'Tap Photo button to choose image'
    }

    this._translateX = new Animated.Value(0)
    this._translateY = new Animated.Value(0)
    this._lastOffset = { x: 0, y: 0 }
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY
          }
        }
      ],
      { useNativeDriver: true }
    )
  }

  setSendButton () {
    Actions.refresh({
      rightTitle: ' Send',
      onRight: () => this.validate(),
      leftTitle: ' ',
      onLeft: () => null
    })
  }

  componentDidMount = () => {
    RNShakeEvent.addEventListener('shake', () => {
      this.resetCardPosition()
    })
    this.getCredits(this.props)
    setTimeout(() => {
      this.setSendButton()
    }, 500)
  }

  componentWillUnmount () {
    RNShakeEvent.removeEventListener('shake')
  }

  resetCardPosition (callback) {
    const { cardImage } = this.state
    this.setState({
      cardImage: null,
      gestureStyle: null,
      isFlipped: false,
      helpText: 'Tap Photo button to change image'
    }, () => setTimeout(() => this.setState({ cardImage }, callback), 300))
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.auth.token !== nextProps.auth.token && nextProps.auth.token) {
      this.getCredits(nextProps)
    }
    this.forceUpdate()
  }

  setCardImage (uri) {
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    this.setState({ cardImage: null }, () => {
      this.resetCardPosition(() => {
        Image.getSize(uri, async (width, height) => {
          if (height > width) {
            if (/^http.*/.test(uri)) {
              const resp = await RNFetchBlob.config({ fileCache: true }).fetch('GET', uri)
              uri = resp.path()
            }
            const resized = await ImageResizer.createResizedImage(uri, height, width, 'JPEG', 90, 270)
            const ratio = Math.max(
              cardWidth / height,
              cardHeight / width
            )
            this.setState({
              height: width * ratio,
              width: height * ratio,
              cardImage: { uri: resized.uri },
              isPortrait: true,
              helpText: 'Tap Photo button to change image'
            }, () => {
              this.saveCard()
              Loading.hide(loader)
            })
          } else {
            const ratio = Math.max(
              cardWidth / width,
              cardHeight / height
            )
            this.setState({
              width: width * ratio,
              height: height * ratio,
              cardImage: { uri },
              isPortrait: false,
              helpText: 'Tap Photo button to change image'
            }, () => {
              this.saveCard()
              Loading.hide(loader)
            })
          }
        })
      })
    })
  }

  resetCard () {
    this.setState({
      toAddresses: []
    }, () => this.saveCard())
  }

  saveCard () {
    this.props.setCardData({
      captionText: this.state.captionText,
      message: this.state.message,
      fromAddress: this.state.fromAddress,
      toAddresses: this.state.toAddresses,
      isPortrait: this.state.isPortrait,
      cardImage: this.state.cardImage,
      cardBorder: this.state.cardBorder,
      captionStyle: this.state.captionStyle,
      width: this.state.width,
      height: this.state.height
    })
  }

  async getCredits (props) {
    if (props.auth.token) {
      api.setToken(props.auth.token)
      const response = await api.getCredits()
      __DEV__ && console.log('Get credit response', response)
      if (response.ok) {
        this.props.setCredit(response.data)
      } else {
        showError({ message: response.data.message || 'An error occurred when connecting with server' })
      }
    }
  }

  validate () {
    if (!this.state.cardImage) {
      this.setState({ isFlipped: false }, () => {
        Alert.alert(
          'Photo Required',
          'Tap Photo button to change image'
        )
      })
      return false
    } else if (!this.state.toAddresses.length) {
      this.setState({ isFlipped: true }, () => {
        Alert.alert(
          'Missing Address',
          'Tap "Mailing Address" and provide a valid mailing address for your card'
        )
      })
      return false
    }
    this.confirmSend()
  }

  confirmSend () {
    if (!this.props.auth.token || !this.props.auth.user) {
      Actions.auth()
      return false
    }
    this.setState({ isFlipped: false }, () => {
      setTimeout(() => {
        this.sendCard()
      }, 1000)
    })
  }

  async sendCard () {
    const uri = await this.refs.viewShot.capture()
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    const resized = await ImageResizer.createResizedImage(uri, 1600, 1200, 'JPEG', 100)
    const cardData = {
      'applicationID': 1,
      'applicationVersion': '2.0',
      'platformName': 'Apple',
      'deviceName': 'iPhone',
      'deviceVersion': '10',
      'productCode': '6x4Postcard',
      'messageBody': this.state.message,
      'sender': {
        'mailingLabel': this.state.fromAddress.name,
        'address1': this.state.fromAddress.line1,
        'address2': this.state.fromAddress.line2,
        'city': this.state.fromAddress.city,
        'state': this.state.fromAddress.state,
        'postalCode': this.state.fromAddress.postalCode,
        'country': this.state.fromAddress.country
      },
      'recipients': this.state.toAddresses.map(address => ({
        'mailingLabel': address.name,
        'address1': address.line1,
        'address2': address.line2,
        'city': address.city,
        'state': address.state,
        'postalCode': address.postalCode,
        'country': address.country
      }))
    }
    const { auth: { token } } = this.props
    api.setToken(token)
    const response = await api.makeOrder(cardData)
    __DEV__ && console.log('create card response', response)
    Loading.hide(loader)
    if (response.ok) {
      const { creditsNeeded, creditsAvailable, invalidRecipients } = response.data
      if (creditsNeeded > creditsAvailable) {
        setTimeout(() => {
          Alert.alert(
            'Insufficient credits',
            'Would you like to purchase more?',
            [
              { text: 'Ok', onPress: () => Actions.credits() },
              { text: 'Cancel' }
            ]
          )
        }, 300)
      } else if (invalidRecipients &&
        invalidRecipients.length &&
        creditsNeeded === 1
      ) {
        setTimeout(() => {
          Alert.alert(
            'Confirmation',
            `Address is not recognized by US Postal Service. Send anyway? (Cost is ${creditsNeeded} credit)`,
            [
              { text: 'Ok', onPress: () => this.uploadCard(response.data, resized) },
              { text: 'Cancel' }
            ]
          )
        }, 300)
      } else {
        setTimeout(() => {
          Alert.alert(
            'Confirmation',
            creditsNeeded > 1
              ? `Do you accept the charges of ${creditsNeeded} credits?`
              : `Do you accept the charges of ${creditsNeeded} credit?`,
            [
              { text: 'Ok', onPress: () => this.uploadCard(response.data, resized) },
              { text: 'Cancel' }
            ]
          )
        }, 300)
      }
    } else {
      showError({ message: 'Unable to submit your order at this time. Please try again later.' })
    }
  }

  async uploadCard (card, resized) {
    const { auth: { token } } = this.props
    const { orderID } = card
    // upload
    const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
    const uploadResponse = await RNFetchBlob.fetch(
      'POST',
      `${Config.API_URL}/orders/${orderID}/images`,
      {
        Authorization: `jwt ${token}`,
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/octet-stream'
      },
      [
        { name: 'file', filename: 'card.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(resized.path) }
      ]
    )
    console.log('upload response', uploadResponse)

    if (uploadResponse.respInfo.status === 200) {
      const submitResponse = await api.submitOrder(orderID)
      __DEV__ && console.log('Submit response', submitResponse)
      if (submitResponse.ok) {
        await this.getCredits(this.props)
        Loading.hide(loader)
        this.resetCard()
        setTimeout(() => {
          Alert.alert('Success!', 'Your order has been placed.')
        }, 300)
      } else {
        Loading.hide(loader)
        showError({ message: 'Unable to submit your order at this time. Please try again later.' })
      }
    } else {
      Loading.hide(loader)
      showError({ message: 'Unable to submit your order at this time. Please try again later.' })
    }
  }

  onFlipPress () {
    let helpText = 'Tap Photo button to change image'
    if (!this.state.isFlipped) {
      if (this.state.toAddresses.length === 1) {
        helpText = ''
      } else if (this.state.toAddresses.length > 1) {
        helpText = `Sending to ${this.state.toAddresses.length} recipients. Tap Address to view list.`
      } else {
        helpText = 'Tap \'Mailing Address\' to add recipients.'
      }
    }
    this.setState({
      isFlipped: !this.state.isFlipped,
      helpText
    })
  }

  onSelectPhotoPress () {
    this.setState({ isFlipped: false }, () => this.ActionSheetSelectPhoto.show())
  }

  async onSelectImageActionSheetPress (index) {
    if (index === 1) {
      try {
        const response = await Permissions.check('photo')
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        if (response === 'denied') {
          Alert.alert('Permission required',
            'To continue please enable Photos from the phone settings page Settings > Postcard > Photos',
            [
              {
                text: 'Ok',
                onPress: () => Linking.openURL('app-settings:')
              }
            ]
          )
          return false
        }
        const image = await ImagePicker.openPicker({
          mediaType: 'photo',
          smartAlbums: [
            'RecentlyAdded',
            'UserLibrary',
            'Generic',
            'Favorites',
            'SelfPortraits',
            'LivePhotos',
            'Panoramas'
          ],
          includeBase64: true
        })
        !!image && this.setCardImage(`data:${image.mime};base64,${image.data}`)
      } catch (error) { }
    } else if (index === 2) {
      try {
        const response = await Permissions.check('camera')
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        if (response === 'denied') {
          Alert.alert('Permission required',
            'To continue please enable Camera from the phone settings page Settings > Postcard > Camera',
            [
              {
                text: 'Ok',
                onPress: () => Linking.openURL('app-settings:')
              }
            ]
          )
          return false
        }
        const image = await ImagePicker.openCamera({
          includeBase64: true
        })
        !!image && this.setCardImage(`data:${image.mime};base64,${image.data}`)
      } catch (error) { }
    } else if (index === 3) {
      Actions.artworkPicker({ onSelect: uri => uri && this.setCardImage(uri) })
    }
  }

  onSelectBorderPress () {
    this.setState({ isFlipped: false }, () => {
      Actions.borders({
        onSelect: uri => {
          const loader = Loading.show({ loadingType: 'Spinner', backgroundColor: Colors.cloud })
          this.setState({ cardBorder: { uri } }, () => {
            this.saveCard()
            Image.getSize(uri, () => Loading.hide(loader))
          })
        }
      })
    })
  }

  onChangeCaptionPress () {
    const { captionText, captionStyle } = this.state
    this.setState({ isFlipped: false }, () => {
      Actions.caption({
        captionText,
        captionStyle,
        onSave: ({ captionText, captionStyle }) => this.setState({ captionText, captionStyle }, () => this.saveCard())
      })
    })
  }

  onAccountPress () {
    if (this.props.auth.token && this.props.auth.user) {
      Actions.account()
    } else {
      Actions.auth()
    }
  }

  onReturnAddressPress () {
    const { fromAddress } = this.state
    Actions.returnAddress({
      fromAddress,
      onSave: fromAddress => {
        this.setState({ fromAddress }, () => this.saveCard())
      }
    })
  }

  onMailingAddressPress () {
    const { toAddresses } = this.state
    Actions.mailingAddress({
      toAddresses,
      onChangeAddresses: toAddresses => {
        let helpText = ''
        if (toAddresses.length === 1) {
          helpText = ''
        } else if (toAddresses.length) {
          helpText = `Sending to ${toAddresses.length} recipients. Tap Address to view list.`
        } else {
          helpText = 'Tap \'Mailing Address\' to add recipients'
        }
        this.setState({ toAddresses, helpText }, () => this.saveCard())
      }
    })
  }

  onCreditsPress () {
    if (this.props.auth.user) {
      Actions.credits()
    } else {
      Actions.auth()
    }
  }

  getAddressString (address) {
    const country = address.country && address.country !== 'US' && address.country !== 'USA' && address.country !== 'United States' ? address.country : ''
    return `${address.name ? address.name + '\n' : ''}${address.line1 ? address.line1 + '\n' : ''}${address.line2 ? address.line2 + '\n' : ''}${address.city ? address.city + ', ' : ''}${address.state || ''} ${address.zipcode || ''}\n${country}`
  }

  render () {
    const {
      captionText,
      captionStyle,
      message,
      fromAddress,
      toAddresses,
      gestureStyle,
      cardBorder,
      cardImage
    } = this.state
    const toAddress = toAddresses[0]
    const cardImageStyle = {
      width: this.state.width,
      height: this.state.height
    }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <TouchableOpacity onPress={() => this.onCreditsPress()}>
          <Text style={styles.credit}>
            {this.props.auth.user && this.props.credit && this.props.credit.available !== undefined
              ? `${this.props.credit.available} credits`
              : 'First card is free'}
          </Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardBackground}>
            <FlipComponent
              rotateDuration={500}
              isFlipped={!this.state.isFlipped}
              frontView={<View style={[styles.cardFront, { backgroundColor: '#555' }]} />}
              backView={<View style={[styles.cardBack, { backgroundColor: '#555' }]} />}
            />
          </View>
          <ViewShot ref='viewShot' style={styles.cardMain}>
            <FlipComponent
              rotateDuration={500}
              backStyles={{ backgroundColor: 'red' }}
              isFlipped={this.state.isFlipped}
              frontView={
                <View style={styles.cardFront}>
                  {cardImage
                    ? <Image
                      style={[styles.cardImage, cardImageStyle, gestureStyle]}
                      source={cardImage}
                      resizeMode='cover'
                    />
                    : (
                      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onSelectPhotoPress()}>
                        <ImageLoad loadingStyle={{ color: 'blue' }} style={styles.cardImage} source={{ uri: this.props.appImages.front }} resizeMode='cover' />
                      </TouchableOpacity>
                    )
                  }
                  {!!cardBorder && <Image style={styles.cardBorder} source={cardBorder} resizeMode='cover' />}
                  {!!cardImage && (
                    // <View style={{ position: 'absolute' }}>
                    <Gestures
                      onChange={(event, styles) => this.setState({
                        gestureStyle: styles,
                        helpText: 'Shake to reset positioning'
                      })}
                    >
                      <Animated.View>
                        <Image
                          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' }}
                          style={{
                            width: cardWidth,
                            height: cardHeight
                          }}
                        />
                      </Animated.View>
                    </Gestures>
                    // </View>
                  )}

                  {!!this.state.captionText && (
                    <View style={
                      this.state.isPortrait
                        ? [styles.captionWrapPortrait, { left: cardWidth * 0.96 - RF(captionStyle.fontSize / 4.5) }]
                        : [styles.captionWrap, { top: cardHeight * 0.97 - RF(captionStyle.fontSize / 4.5) }]
                    }>
                      <Gestures
                        onChange={(event, styles) => {
                          this.setState({
                            captionGestureStyle: styles,
                            helpText: 'Shake to reset positioning'
                          })
                        }}
                      >
                        <Animated.View
                          style={this.state.isPortrait
                            ? {
                              height: cardHeight,
                              width: RF(captionStyle.fontSize / 2)
                            }
                            : null}
                        >
                          <Text style={[
                            captionStyle,
                            {
                              fontSize: RF(captionStyle.fontSize / 4.5),
                              height: RF(captionStyle.fontSize / 3)
                            },
                            this.state.isPortrait
                              ? styles.captionPortrait
                              : styles.caption
                          ]}>
                            {captionText}
                          </Text>
                        </Animated.View>
                      </Gestures>
                    </View>
                  )}
                </View>
              }
              backView={this.state.isFlipped || Platform.OS === 'ios'
                ? (
                  <View style={styles.cardBack}>
                    <ImageLoad loadingStyle={{ color: 'blue' }} style={styles.cardImage} source={{ uri: this.props.appImages.back }} resizeMode='cover' />
                    <TouchableOpacity style={styles.messageWrap} onPress={() => Actions.message({
                      message,
                      onSave: message => this.setState({ message }, () => this.saveCard())
                    })}>
                      {message
                        ? <Text style={styles.messageText} numberOfLines={14}>{message}</Text>
                        : <Image source={Images.message} style={styles.messageImage} resizeMode='contain' />
                      }
                    </TouchableOpacity>
                    <View style={styles.addresses}>
                      <Text style={styles.fromLabel}>From:</Text>
                      <TouchableOpacity style={styles.fromAddressWrap} onPress={() => this.onReturnAddressPress()}>
                        {fromAddress && (fromAddress.name || fromAddress.line1 || fromAddress.city || fromAddress.state)
                          ? <Text style={styles.fromAddressText}>{this.getAddressString(fromAddress)}</Text>
                          : <Image source={Images.fromAddress} style={styles.fromAddressImage} resizeMode='contain' />
                        }
                      </TouchableOpacity>
                      <Text style={styles.toLabel}>To:</Text>
                      <TouchableOpacity
                        style={styles.toAddressWrap}
                        onPress={() => this.onMailingAddressPress()}>
                        {toAddress
                          ? <Text style={styles.toAddressText}>{this.getAddressString(toAddress)}</Text>
                          : <Image source={Images.toAddress} style={styles.toAddressImage} resizeMode='contain' />
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                )
                : <View />
              }
            />
          </ViewShot>
        </View>

        <Text style={styles.helpText}>{this.state.helpText}</Text>

        <View style={styles.footer}>
          <SafeAreaView style={styles.fotterButtons} forceInset={{ bottom: 'alway' }}>
            <TouchableOpacity style={styles.footerButton} onPress={() => this.onFlipPress()}>
              <Image source={Images.toolbarFlip} style={styles.footerIcon} resizeMode='contain' />
              <Text style={styles.footerText}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.onSelectPhotoPress()}>
              <Image source={Images.toolbarPhoto} style={styles.footerIcon} resizeMode='contain' />
              <Text style={styles.footerText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.onSelectBorderPress()}>
              <Image source={Images.toolbarFrane} style={styles.footerIcon} resizeMode='contain' />
              <Text style={styles.footerText}>Border</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.onChangeCaptionPress()}>
              <Image source={Images.toolbarHeadline} style={styles.footerIcon} resizeMode='contain' />
              <Text style={styles.footerText}>Caption</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => this.onAccountPress()}>
              <Image source={Images.toolbarOptions} style={styles.footerIcon} resizeMode='contain' />
              <Text style={styles.footerText}>Account</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <ActionSheet
          ref={ref => (this.ActionSheetSelectPhoto = ref)}
          title=''
          options={['Cancel', 'Choose Existing', 'Take A Photo', 'Card Artwork']}
          cancelButtonIndex={0}
          onPress={(index) => this.onSelectImageActionSheetPress(index)}
        />
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    credit: state.credit,
    data: state.card.data,
    appImages: state.images.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(CreditActions, dispatch),
    ...bindActionCreators(CardActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
