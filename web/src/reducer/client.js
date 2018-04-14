const initState = {
  all : { data : [], error : null, pending : false },
  one : { data : {}, error : null, pending : false },
  validation : { error : {}, pending : false }
}

const clientReducer = (state = initState, action) => {
  let { data, error, type } = action

  switch ( type ) {
    case "GET_CLIENTS" : {
      let all = { ...state.all, error : null, pending : true }
      return { ...state, all }
    }
    case "GET_CLIENTS_OK" : {
      let all = { data, error : null, pending : false }
      return { ...state, all }
    }
    case "GET_CLIENTS_FAIL" : {
      let all = { ...state.all, error, pending : false }
      return { ...state, all }
    }
    case "GET_CLIENT" : {
      let one = { ...state.one, error : null, pending : true }
      return { ...state, one }
    }
    case "GET_CLIENT_OK" : {
      let one = { data, error : null, pending : false }
      return { ...state, one }
    }
    case "GET_CLIENT_FAIL" : {
      let one = { ...state.one, error, pending : false }
      return { ...state, one }
    }
    case "CREATE_CLIENT" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "CREATE_CLIENT_OK" : {
      let all = { ...state.all, data : [ ...state.all.data, data ] }
      let one = { data, error : null, pending : false }

      return { all, one, validation : initState.validation }
    }
    case "CREATE_CLIENT_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "UPDATE_CLIENT" : {
      let validation = { ...state.validation, pending : true }
      return { ...state, validation }
    }
    case "UPDATE_CLIENT_OK" : {
      let clients = state.all.data
        .filter(c => c.id !== data.id)

      let all = { ...state.all, data : clients }
      let one = { data, error : null, pending : false }

      return { all, one, validation : initState.validation }
    }
    case "UPDATE_CLIENT_FAIL" : {
      let one = { ...state.one, error }
      return { ...state, one, validation : initState.validation }
    }
    case "CLIENT_VALIDATION_FAIL" : {
      let validation = { error, pending : false }
      return { ...state, validation }
    }
    case "RESET_CLIENTS" : {
      let one = state.one
      return { ...initState, one }
    }
    case "RESET_CLIENT" : {
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

export default clientReducer
