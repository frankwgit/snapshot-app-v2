import React, { Component } from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import { Colors } from '../Themes'
import styles from './Styles/NavigationStyles'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import {
  Scene,
  Router,
  Actions,
  Reducer,
  // ActionConst,
  Overlay,
  // Tabs,
  Modal,
  // Drawer,
  Stack,
  Lightbox
} from 'react-native-router-flux'
import MessageBar from '../Containers/MessageBar'
import ErrorModal from '../Components/modal/ErrorModal'
// import MenuIcon from '../Images/Icons/menu_burger.png'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'
// import GalleryPickerScreen from '../Containers/GalleryPickerScreen'
import ArtworkCategoriesScreen from '../Containers/ArtworkCategoriesScreen'
import ArtworksScreen from '../Containers/ArtworksScreen'
import BordersScreen from '../Containers/BordersScreen'
import CaptionScreen from '../Containers/CaptionScreen'
import FontPickerScreen from '../Containers/FontPickerScreen'
import SizePickerScreen from '../Containers/SizePickerScreen'
import ColorPickerScreen from '../Containers/ColorPickerScreen'
import AccountScreen from '../Containers/AccountScreen'
import MessageScreen from '../Containers/MessageScreen'
import ReturnAddressScreen from '../Containers/ReturnAddressScreen'
import MailingAddressScreen from '../Containers/MailingAddressScreen'
import MailingAddressAddScreen from '../Containers/MailingAddressAddScreen'
import ContactPickerScreen from '../Containers/ContactPickerScreen'
import ContactDetailScreen from '../Containers/ContactDetailScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import ForgotScreen from '../Containers/ForgotScreen'
import PhotoViewScreen from '../Containers/PhotoViewScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import OrderHistoryScreen from '../Containers/OrderHistoryScreen'
import CreditsScreen from '../Containers/CreditsScreen'
import HelpScreen from '../Containers/HelpScreen'

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

const getSceneStyle = () => ({
  backgroundColor: Colors.background,
  shadowOpacity: 1,
  shadowRadius: 3
})

const justifyNavbar = {
  leftTitle: ' ',
  onLeft: () => null,
  rightTitle: ' ',
  onRight: () => null
}

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://'

class AppNavigation extends Component {
  render () {
    return (
      <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        uriPrefix={prefix}
        navigationBarStyle={styles.navbarStyle}
        leftButtonTextStyle={styles.buttonTextStyle}
        backButtonTextStyle={styles.buttonTextStyle}
        rightButtonTextStyle={styles.buttonTextStyle}
      >
        <Overlay key='overlay'>
          <Modal key='modal'
            hideNavBar
            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
          >
            <Lightbox key='lightbox'>
              <Stack
                key='root'
                titleStyle={styles.title}
                {...justifyNavbar}
              >
                <Scene key='home' component={HomeScreen} title='Postcard' />
                {/* <Scene key='galleryPicker' component={GalleryPickerScreen} title='Photos' /> */}
                <Scene key='borders' back component={BordersScreen} title='Borders' />
                <Scene key='caption' back component={CaptionScreen} title='Edit Caption' />
                <Scene key='account' back component={AccountScreen} title='Account' />
                <Scene key='message' back component={MessageScreen} title='Edit Message' />
                <Scene key='returnAddress' back component={ReturnAddressScreen} title='Return Address' rightTitle='Done' onRight={() => null} />
                <Scene key='contactPicker' back component={ContactPickerScreen} title='Contacts' />
                <Scene key='contactDetail' back component={ContactDetailScreen} />
                <Scene key='mailingAddress' back={false} component={MailingAddressScreen} title='Mail To' />
                <Scene key='mailingAddressAdd' back={false} component={MailingAddressAddScreen} title='Mailing Address' leftTitle='Cancel' onLeft={Actions.pop} rightTitle='Add' onRight={() => null} />
              </Stack>
              <Scene key='fontPicker' component={FontPickerScreen} />
              <Scene key='sizePicker' component={SizePickerScreen} />
              <Scene key='colorPicker' component={ColorPickerScreen} />
            </Lightbox>
            <Scene key='launch' component={LaunchScreen} title='Launch' initial />
            <Scene key='error' component={ErrorModal} />
            <Stack key='auth' back navTransparent navigationBarStyle={styles.navTransparent}>
              <Scene key='register' component={RegisterScreen} title='' />
              <Scene key='login' component={LoginScreen} title='' />
              <Scene key='forgot' component={ForgotScreen} title='' />
            </Stack>
            <Stack key='artworkPicker' back titleStyle={styles.title} {...justifyNavbar}>
              <Scene key='artworkCategories' component={ArtworkCategoriesScreen} title='Categories' />
              <Scene key='artworks' component={ArtworksScreen} title='' />
            </Stack>
            <Scene key='photoView' component={PhotoViewScreen} title='' />
            <Scene key='changePassword' component={ChangePasswordScreen} hideNavBar={false} title='Password' back titleStyle={styles.title} {...justifyNavbar} />
            <Scene key='orderHistory' component={OrderHistoryScreen} hideNavBar={false} title='My Orders' back titleStyle={styles.title} {...justifyNavbar} />
            <Scene key='credits' component={CreditsScreen} hideNavBar={false} title='Credits' back titleStyle={styles.title} {...justifyNavbar} />
            <Scene key='help' component={HelpScreen} hideNavBar={false} title='Help' back titleStyle={styles.title} {...justifyNavbar} />
          </Modal>

          <Scene component={MessageBar} />
        </Overlay>
      </Router>
    )
  }
}

export default AppNavigation
