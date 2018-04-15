const initState = {
  all : { data : [], error : null, pending : false },
  one : { data : {}, error : null, pending : false },
  validation : { error : {}, pending : false }
}

const projectReducer = (state = initState, action) => {
  let { data, error, type } = action

  switch ( type ) {
    case "GET_PROJECTS" : {
      let all = { ...state.all, error : null, pending : true }
      return { ...state, all }
    }
    case "GET_PROJECTS_OK" : {
      let all = { data, error : null, pending : false }
      return { ...state, all }
    }
    case "GET_PROJECTS_FAIL" : {
      let all = { ...state.all, error, pending : false }
      return { ...state, all }
    }
    case "GET_PROJECT" : {
      let one = { ...state.one, error : null, pending : true }
      return { ...state, one }
    }
    case "GET_PROJECT_OK" : {
      let one = { data, error : null, pending : false }
      return { ...state, one }
    }
    case "GET_PROJECT_FAIL" : {
      let one = { ...state.one, error, pending : false }
      return { ...state, one }
    }
    case "CREATE_PROJECT" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "CREATE_PROJECT_OK" : {
      let one = { data, error : null, pending : false }
      return { ...state, one, validation : initState.validation }
    }
    case "CREATE_PROJECT_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "UPDATE_PROJECT" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "UPDATE_PROJECT_OK" : {
      let one = { data, error : null, pending : false }
      return { ...state, one, validation : initState.validation }
    }
    case "UPDATE_PROJECT_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "PROJECT_VALIDATION_FAIL" : {
      let validation = { error, pending : false }
      return { ...state, validation }
    }
    case "RESET_PROJECTS" : {
      let one = state.one
      return { ...initState, one }
    }
    case "RESET_PROJECT" : {
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

export default projectReducer
