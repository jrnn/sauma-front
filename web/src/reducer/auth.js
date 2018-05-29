const initState = {
  error : null,
  pending : false,
  forgotError : null,
  forgotPending : false
}

const auth = (state = initState, action) => {
  let { payload, type } = action

  switch ( type ) {
    case "LOGIN" :
      return {
        ...state,
        pending : true
      }
    case "LOGIN_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "LOGIN_OK" :
      return {
        ...state,
        error : null,
        pending : false
      }
    case "SET_AUTH" :
      return {
        ...initState,
        ...payload
      }
    case "FORGOT" :
      return {
        ...state,
        forgotPending : true
      }
    case "FORGOT_ERROR" :
      return {
        ...state,
        forgotError : payload,
        forgotPending : false
      }
    case "FORGOT_OK" :
      return {
        ...state,
        forgotError : null,
        forgotPending : false
      }
    case "LOGOUT" :
      return initState
    default :
      return state
  }
}

export default auth
