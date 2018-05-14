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
    case "REQUEST_MATERIALS" :
      return {
        ...state,
        pending : true
      }
    case "REQUEST_MATERIALS_OK" :
      return {
        items : payload,
        error : null,
        pending : false,
        updated : Date.now()
      }
    case "REQUEST_MATERIALS_ERROR" :
      return {
        ...state,
        error : payload,
        pending : false
      }
    case "CREATE_MATERIAL_OK" :
      return {
        ...state,
        items : [ ...state.items, payload ]
      }
    case "UPDATE_MATERIAL_OK" : {
      let items = state.items
        .filter(m => m.id !== payload.id)

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
    case "WRITE_MATERIAL" :
      return {
        ...state,
        pending : true
      }
    case "WRITE_MATERIAL_ERROR" :
      return {
        ...state,
        pending : false
      }
    case "WRITE_MATERIAL_INVALID" :
      return {
        errors : payload,
        pending : false
      }
    case "RESET_WRITE_MATERIAL" :
      return initState.write
    default :
      return state
  }
}

const materials = combineReducers({
  data,
  write
})

export default materials
