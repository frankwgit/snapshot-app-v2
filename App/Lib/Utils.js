
import config from 'react-native-config'
import { Metrics } from '../Themes'

export const url = (uri) => {
  return /^(https?:\/\/)/.test(uri) ? uri : `${config.BASE_URL}/${uri}`
}

export function RF (percent) {
  const heightPercent = percent * Metrics.screenWidth
  return Math.round(heightPercent) / 100
}
