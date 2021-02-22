import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setBorders: ['borders'],
  setArtworks: ['artworks'],
  setDefaultImages: ['images']
})

export const ImagesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  borders: [],
  artworks: [],
  images: {}
})

/* ------------- Reducers ------------- */

export const setBorders = (state, { borders }) =>
  state.merge({ borders })
export const setArtworks = (state, { artworks }) =>
  state.merge({ artworks })
export const setDefaultImages = (state, { images }) =>
  state.merge({ images })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_BORDERS]: setBorders,
  [Types.SET_ARTWORKS]: setArtworks,
  [Types.SET_DEFAULT_IMAGES]: setDefaultImages
})
