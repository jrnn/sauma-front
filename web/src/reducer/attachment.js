import { types } from "../action/attachment"

const initState = { pending : false }

const attachments = (state = initState, action) => {
  switch ( action.type ) {
    case types.REQUEST_START :
      return {
        pending : true
      }
    case types.REQUEST_OVER :
      return {
        pending : false
      }
    case "LOGOUT" :
      return initState
    default :
      return state
  }
}

export default attachments
