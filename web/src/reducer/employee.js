import { combineReducers } from "redux"
import { types } from "../action/employee"

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

const employees = combineReducers({
  data,
  write
})

export default employees
