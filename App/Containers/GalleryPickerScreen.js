import React, { Component } from 'react'
import { Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { CameraKitCameraScreen, CameraKitGalleryView } from 'react-native-camera-kit'
// Styles
import styles from './Styles/GalleryPickerScreenStyle'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'

class GalleryPickerScreen extends Component {
  state = {
    selectedImages: []
  }

  async onBottomButtonPressed ({ type, image }) {
    this.setState({ shouldRenderCameraScreen: false })
    if (type === 'right') {
      Actions.pop()
      this.props.onSelect && this.props.onSelect(image)
    }
  }

  render () {
    if (this.state.shouldRenderCameraScreen) {
      return (
        <Modal visible>
          <CameraKitCameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            flashImages={{
              on: Images.flashOn,
              off: Images.flashOff,
              auto: Images.flashAuto
            }}
            cameraFlipImage={Images.cameraFlipIcon}
            captureButtonImage={Images.cameraButton}
          />
        </Modal>
      )
    } else {
      return (
        <CameraKitGalleryView
          ref={gallery => { this.gallery = gallery }}
          style={styles.container}
          minimumInteritemSpacing={5}
          minimumLineSpacing={5}
          // albumName={<ALBUM_NAME>}
          columnCount={3}
          onTapImage={event => {
            // event.nativeEvent.selected - ALL selected images ids
            Actions.pop()
            this.props.onSelect && this.props.onSelect(event.nativeEvent.selected)
          }}
          getUrlOnTapImage
          selectedImages={this.state.selectedImages}
          selection={{
            selectedImage: Images.selected,
            imagePosition: 'top-right',
            imageSizeAndroid: 'large',
            enable: this.state.selectedImages.length < 1
          }}
          customButtonStyle={{
            image: Images.openCamera,
            backgroundColor: '#ccc'
          }}
          onCustomButtonPress={() => this.setState({ shouldRenderCameraScreen: true })}
        />
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPickerScreen)
