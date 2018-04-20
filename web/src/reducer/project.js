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
    case "REQUEST_PROJECTS" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_PROJECTS_OK" :
      return {
        items : payload,
        error : null,
        pending : false
      }
    case "REQUEST_PROJECTS_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_PROJECT_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_PROJECT_OK" : {
      let items = state.items
        .filter(e => e.id !== payload.id)

      return {
        ...state,
        items : [ ...items, payload ]
      }
    }
    case "RESET_PROJECTS" :
      return initState.data
    default :
      return state
  }
}

const write = (state = initState.write, action) => {
  let { payload, type } = action

  switch ( type ) {
    case "WRITE_PROJECT" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_PROJECT_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_PROJECT_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_PROJECT" :
      return initState.write
    default :
      return state
  }
}

const projects = combineReducers({
  data,
  write
})

export default projects
