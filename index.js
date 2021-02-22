import { Client } from 'bugsnag-react-native'
import Config from 'react-native-config'
const bugsnag = new Client(Config.BUGSNAG_KEY)
import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'

AppRegistry.registerComponent('PostCard', () => App)
