import { combineReducers } from "redux"
import { types } from "../action/client"

const initState = {
  data : {
    items : [],
    error : null,
    pending : false,
    updated : 1
  },
  write : {
    errors : {},
    pending : false
  }
}

const data = (state = initState.data, action) => {
  let { payload, type } = action

  switch ( type ) {
    case types.FETCH :
      return {
        ...state,
        pending : true
      }
    case types.FETCH_OK :
      return {
        items : payload,
        error : null,
        pending : false,
        updated : Date.now()
      }
    case types.FETCH_ERROR :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case types.CREATED :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case types.UPDATED : {
      let items = state.items
        .filter(c => c.id !== payload.id)

      return {
        ...state,
        items : [ ...items, payload ]
      }
    }
    case "LOGOUT" :
      return initState.data
    default :
      return state
  }
}

const write = (state = initState.write, action) => {
  let { payload, type } = action

  switch ( type ) {
    case types.WRITE :
      return {
        ...state,
        pending : true
      }
    case types.WRITE_ERROR :
      return {
        ...state,
        pending : false
      }
    case types.WRITE_INVALID :
      return {
        errors : payload,
        pending : false
      }
    case types.WRITE_RESET :
      return initState.write
    default :
      return state
  }
}

const clients = combineReducers({
  data,
  write
})

export default clients
