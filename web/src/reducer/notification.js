const initState = {
  message : null,
  type : null,
  stack : 0
}

const notificationReducer = (state = initState, action) => {
  let { data, type } = action

  switch ( type ) {
    case "HIDE_NOTIFICATION" : {
      return ( state.stack < 2 )
        ? initState
        : { ...state, stack : state.stack - 1 }
    }
    case "SET_NOTIFICATION" : {
      return { ...data, stack : state.stack + 1 }
    }
    default :
      return state
  }
}

export default notificationReducer
