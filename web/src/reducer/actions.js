import authService from "../service/auth_service"

export const getAuth = () => ({ type : "GET_AUTH" })

export const login = (username, password) => {
  return async (dispatch) => {
    let auth = await authService
      .login({ username, password })

    dispatch({ type : "LOGIN", auth })
  }
}

export const logout = () => ({ type : "LOGOUT" })
