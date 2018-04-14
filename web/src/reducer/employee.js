const initState = {
  all : { data : [], error : null, pending : false },
  one : { data : {}, error : null, pending : false },
  validation : { error : {}, pending : false }
}

const employeeReducer = (state = initState, action) => {
  let { data, error, type } = action

  switch ( type ) {
    case "GET_EMPLOYEES" : {
      let all = { ...state.all, error : null, pending : true }
      return { ...state, all }
    }
    case "GET_EMPLOYEES_OK" : {
      let all = { data, error : null, pending : false }
      return { ...state, all }
    }
    case "GET_EMPLOYEES_FAIL" : {
      let all = { ...state.all, error, pending : false }
      return { ...state, all }
    }
    case "GET_EMPLOYEE" : {
      let one = { ...state.one, error : null, pending : true }
      return { ...state, one }
    }
    case "GET_EMPLOYEE_OK" : {
      let one = { data, error : null, pending : false }
      return { ...state, one }
    }
    case "GET_EMPLOYEE_FAIL" : {
      let one = { ...state.one, error, pending : false }
      return { ...state, one }
    }
    case "CREATE_EMPLOYEE" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "CREATE_EMPLOYEE_OK" : {
      let all = { ...state.all, data : [ ...state.all.data, data ] }
      let one = { data, error : null, pending : false }

      return { all, one, validation : initState.validation }
    }
    case "CREATE_EMPLOYEE_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "UPDATE_EMPLOYEE" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "UPDATE_EMPLOYEE_OK" : {
      let employees = state.all.data
        .filter(e => e.id !== data.id)

      let all = { ...state.all, data : employees }
      let one = { data, error : null, pending : false }

      return { all, one, validation : initState.validation }
    }
    case "UPDATE_EMPLOYEE_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "EMPLOYEE_VALIDATION_FAIL" : {
      let validation = { error, pending : false }
      return { ...state, validation }
    }
    case "RESET_EMPLOYEES" : {
      let one = state.one
      return { ...initState, one }
    }
    case "RESET_EMPLOYEE" : {
      let all = state.all
      return { ...initState, all }
    }
    case "LOGOUT" : {
      return initState
    }
    default :
      return state
  }
}

export default employeeReducer
