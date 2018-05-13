import { combineReducers } from "redux"

const initState = {
  data : {
    items : [],
    error : null,
    pending : false,
    updated : null
  },
  write : {
    errors : {},
    pending : false
  }
}

const data = (state = initState.data, action) => {
  let { payload, type } = action

  switch ( type ) {
    case "REQUEST_ACTIVITIES" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_ACTIVITIES_OK" :
      return {
        items : payload,
        error : null,
        pending : false,
        updated : Date.now()
      }
    case "REQUEST_ACTIVITIES_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_ACTIVITY_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_ACTIVITY_OK" : {
      let items = state.items
        .filter(t => t.id !== payload.id)

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
    case "WRITE_ACTIVITY" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_ACTIVITY_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_ACTIVITY_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_ACTIVITY" :
      return initState.write
    default :
      return state
  }
}

const activities = combineReducers({
  data,
  write
})

export default activities
