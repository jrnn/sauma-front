const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_STATE" : {
      return action.employees
    }
    case "LOGOUT" : {
      return []
    }
    default :
      return state
  }
}

export default employeeReducer
