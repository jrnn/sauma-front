const initState = null

const authReducer = (state = initState, action) => {
  let { data, type } = action

  switch ( type ) {
    case "SET_AUTH" : {
      return data || null
    }
    case "LOGOUT" : {
      return initState
    }
    default :
      return state
  }
}

export default authReducer
