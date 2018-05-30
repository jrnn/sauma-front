export const standardDataReducer = (types) => {
  const initState = {
    items : [],
    error : null,
    pending : false,
    updated : 1
  }

  return (state = initState, action) => {
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
          .filter(item => item.id !== payload.id)

        return {
          ...state,
          items : [ ...items, payload ]
        }
      }
      case "LOGOUT" :
        return initState
      default :
        return state
    }
  }
}

export const standardMinimalReducer = (types) => {
  const initState = { pending : false }

  return (state = initState, action) => {
    switch ( action.type ) {
      case types.REQUEST_START :
        return {
          pending : true
        }
      case types.REQUEST_OVER :
        return {
          pending : false
        }
      case "LOGOUT" :
        return initState
      default :
        return state
    }
  }
}

export const standardWriteReducer = (types) => {
  const initState = {
    errors : {},
    pending : false
  }

  return (state = initState, action) => {
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
        return initState
      default :
        return state
    }
  }
}
