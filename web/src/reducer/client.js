import { combineReducers } from "redux"

const initState = {
  data : {
    items : [],
    error : null,
    pending : false
  },
  write : {
    errors : {},
    pending : false
  }
}

const data = (state = initState.data, action) => {
  let { payload, type } = action

  switch ( type ) {
    case "REQUEST_CLIENTS" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_CLIENTS_OK" :
      return {
        items : payload,
        error : null,
        pending : false
      }
    case "REQUEST_CLIENTS_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_CLIENT_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_CLIENT_OK" : {
      let items = state.items
        .filter(c => c.id !== payload.id)

      return {
        ...state,
        items : [ ...items, payload ]
      }
    }
    case "RESET_CLIENTS" :
      return initState.data
    default :
      return state
  }
}

const write = (state = initState.write, action) => {
  let { payload, type } = action

  switch ( type ) {
    case "WRITE_CLIENT" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_CLIENT_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_CLIENT_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_CLIENT" :
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
