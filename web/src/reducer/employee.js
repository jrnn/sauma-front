import { combineReducers } from "redux"
import { standardWriteReducer } from "./generic"
import { types } from "../action/employee"

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
        .filter(e => e.id !== payload.id)

      return {
        ...state,
        items : [ ...items, payload ]
      }
    }
    case types.ASSIGNED : {
      let { employee, project } = payload

      let items = state.items
        .filter(e => e.id !== employee)
      let item = state.items
        .find(e => e.id === employee)

      item.projects = item.projects.concat(project.id)

      return {
        ...state,
        items : [ ...items, item ]
      }
    }
    case "LOGOUT" :
      return initState
    default :
      return state
  }
}

const employees = combineReducers({
  data,
  write : standardWriteReducer(types)
})

export default employees
