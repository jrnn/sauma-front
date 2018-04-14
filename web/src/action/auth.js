import axios from "axios"

const url = "/api/login"

export const getAuth = () => {
  return async (dispatch) => {
    let auth = JSON.parse(
      localStorage.getItem("sauma_auth"))

    dispatch({
      type : "SET_AUTH",
      data : auth
    })
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    let res = await axios
      .post(url, { username, password })

    localStorage.setItem(
      "sauma_auth",
      JSON.stringify(res.data))

    dispatch({
      type : "SET_AUTH",
      data : res.data
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("sauma_auth")

    dispatch({ type : "LOGOUT" })
  }
}
