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
    case "REQUEST_EMPLOYEES" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_EMPLOYEES_OK" :
      return {
        items : payload,
        error : null,
        pending : false,
        updated : Date.now()
      }
    case "REQUEST_EMPLOYEES_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_EMPLOYEE_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_EMPLOYEE_OK" : {
      let items = state.items
        .filter(e => e.id !== payload.id)

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
    case "WRITE_EMPLOYEE" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_EMPLOYEE_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_EMPLOYEE_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_EMPLOYEE" :
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
