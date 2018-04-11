const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "HIDE_NOTIFICATION" : {
      return null
    }
    case "SET_NOTIFICATION" : {
      return action.notification
    }
    default :
      return state
  }
}

export default notificationReducer
