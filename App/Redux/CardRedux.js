import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setCardData: ['data'],
  resetCardData: null
})

export const CardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {
    captionText: '',
    message: '',
    fromAddress: '',
    toAddresses: [],
    cardImage: null,
    cardBorder: null,
    isPortrait: false,
    captionStyle: null,
    width: null,
    height: null
  }
})

/* ------------- Reducers ------------- */

export const setCardData = (state, { data }) =>
  state.merge({ data })

export const resetCardData = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CARD_DATA]: setCardData,
  [Types.RESET_CARD_DATA]: resetCardData
})
