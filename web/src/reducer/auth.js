const initState = {
  error : null,
  pending : false
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
        error : payload,
        pending : false
      }
    case "LOGOUT" :
      return initState
    case "SET_AUTH" : {
      payload.error = null
      payload.pending = false

      return payload
    }
    default :
      return state
  }
}

export default auth
