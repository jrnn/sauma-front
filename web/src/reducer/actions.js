import authService from "../service/auth_service"
import employeeService from "../service/employee_service"

export const getAuth = () => ({ type : "GET_AUTH" })

export const initState = () => {
  return async (dispatch) => {
    let employees = await employeeService
      .findAll()

    dispatch({ type : "INIT_STATE", employees })
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    let auth = await authService
      .login({ username, password })

    dispatch({ type : "LOGIN", auth })
  }
}

export const notify = (content, type, timeout) => {
  return async (dispatch) => {
    setTimeout(() =>
      dispatch({ type : "HIDE_NOTIFICATION" }),
      (timeout * 1000))

    dispatch({
      type : "SET_NOTIFICATION",
      notification : { content, type }
    })
  }
}

export const logout = () => ({ type : "LOGOUT" })
