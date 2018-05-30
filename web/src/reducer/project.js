import { combineReducers } from "redux"
import { standardWriteReducer } from "./standard_reducers"
import { types } from "../action/project"

const initState = {
  items : [],
  error : null,
  pending : false,
  updated : 1
}

const data = (state = initState, action) => {
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
        .filter(p => p.id !== payload.id)

      return {
        ...state,
        items : [ ...items, payload ]
      }
    }
    case types.ASSIGNED : {
      let { project } = payload
      let items = state.items
        .filter(p => p.id !== project.id)

      return {
        ...state,
        items : [ ...items, project ]
      }
    }
    case "LOGOUT" :
      return initState
    default :
      return state
  }
}

const projects = combineReducers({
  data,
  write : standardWriteReducer(types)
})

export default projects
