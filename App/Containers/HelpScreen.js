import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, Linking, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HelpScreenStyle'
import VideoPlayer from 'react-native-video-player'
import { Metrics, Images } from '../Themes'

class HelpScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.containerStyle}>
        <Text style={styles.topLabel}>Send Real Postcards to Real Mailboxes</Text>
        <View style={styles.videoView}>
          <VideoPlayer
            endWithThumbnail
            thumbnail={Images.logo}
            video={{ uri: this.props.appImages.helpVideo }}
            videoWidth={400}
            videoHeight={225}
            // autoplay
            onEnd={() => this.setState({ isPlaying: false })}
            ref={r => (this.player = r)}
          />
        </View>
        <Text style={styles.label}>Workflow</Text>
        <Text style={styles.description}>1. Tap 'Photo' to choose your picture</Text>
        <Text style={styles.description}>2. Flip the postcard</Text>
        <Text style={styles.description}>3. Tap fields to enter message and addresses</Text>
        <Text style={styles.description}>4. Send the postcard!</Text>

        <Text style={styles.label}>Workflow</Text>
        <Text style={styles.description}>Adjust your photo or caption using "pinch to zoom" multi-touch gestures.</Text>
        <Text style={styles.description}>Shake to reset photo and captions position.</Text>

        <Text style={styles.label}>Addressing</Text>
        <Text style={styles.description}>Tap "+" to choose recipients from your address book</Text>
        <Text style={styles.description}>The return address and photo remain for your next postcard, unless you change them.</Text>

        <Text style={styles.label}>Pricing</Text>
        <Text style={styles.description}>Mailed to a US address = 1 credit</Text>
        <Text style={styles.description}>Mailed internaionally = 2 credits</Text>

        <Text style={styles.label}>Email or visit us for more details</Text>
        <TouchableOpacity onPress={() => {
          Linking.canOpenURL('mailto:support@snapshotpostcard.com').then(supported => {
            if (supported) {
              Linking.openURL('mailto:support@snapshotpostcard.com')
            } else {
              // console.log("Don't know how to open URI: " + 'support@snapshotpostcard.com');
            }
          })
        }}>
          <Text style={styles.link}>support@snapshotpostcard.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Linking.canOpenURL('https://www.snapshotpostcard.com').then(supported => {
            if (supported) {
              Linking.openURL('https://www.snapshotpostcard.com')
            } else {
              // console.log("Don't know how to open URI: " + 'www.snapshotpostcard.com');
            }
          })
        }}>
          <Text style={styles.link}>www.snapshotpostcard.com</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appImages: state.images.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
