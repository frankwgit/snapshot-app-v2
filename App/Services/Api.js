// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from 'react-native-config'

// our "constructor"
const create = (baseURL = Config.API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'x-api-key': Config.SECRET_KEY
    },
    // 10 second timeout...
    timeout: 10000
  })

  const setToken = (token) => api.setHeader('Authorization', 'jwt ' + token)

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = ({ username, password }) => api.post(`/auth/login`, { username, password })
  const validate = (token) => api.post(`/auth/validate`, { token })
  const register = (data) => api.post(`/accounts`, data)
  const forgot = (data) => api.post(`/accounts/resetPassword`, data)
  const changePassword = (data) => api.post(`/accounts/changePassword`, data)
  const getMe = () => api.get(`/accounts/current`)
  const getBorders = () => api.get(`/applications/1/images/borders`)
  const getArtworks = () => api.get(`/applications/1/images/artwork`)
  const getDefaultImages = () => api.get(`/applications/1/images/app`)
  const getCredits = () => api.get(`/accounts/current/credits`)
  const makeOrder = (data) => api.post(`/orders`, data)
  const submitOrder = (id) => api.post(`/orders/${id}/submit`)
  const getOrders = (query) => api.get(`/orders/`, query)
  const getUrl = (query) => api.get(`/applications/links/buyCredits`, query)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    setToken,
    // a list of the API functions from step 2
    login,
    validate,
    register,
    forgot,
    changePassword,
    getMe,
    getBorders,
    getArtworks,
    getDefaultImages,
    getCredits,
    makeOrder,
    submitOrder,
    getOrders,
    getUrl
  }
}

// let's return back our create method as the default.
export default {
  create
}
