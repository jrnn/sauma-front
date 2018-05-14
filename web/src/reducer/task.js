import { combineReducers } from "redux"

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
    case "REQUEST_TASKS" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_TASKS_OK" :
      return {
        items : payload,
        error : null,
        pending : false,
        updated : Date.now()
      }
    case "REQUEST_TASKS_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_TASK_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_TASK_OK" : {
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
    case "WRITE_TASK" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_TASK_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_TASK_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_TASK" :
      return initState.write
    default :
      return state
  }
}

const tasks = combineReducers({
  data,
  write
})

export default tasks
