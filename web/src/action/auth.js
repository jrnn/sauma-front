import axios from "axios"
import { notify } from "./notification"

const url = "/api/login"

const setAuth = (auth) => ({
  type : "SET_AUTH",
  payload : auth
})

export const checkAuth = () => {
  return (dispatch) => {
    let auth = JSON.parse(
      localStorage.getItem("sauma_auth"))

    if ( auth )
      dispatch(setAuth(auth))
    else
      dispatch(logout())
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type : "LOGIN" })

    try {
      let res = await axios
        .post(url, { username, password })

      let auth = res.data
      localStorage.setItem(
        "sauma_auth",
        JSON.stringify(auth))

      dispatch(setAuth(auth))
      dispatch(notify(`Olet kirjautunut sisään. Tervetuloa, ${auth.firstName}!`, "ok"))

    } catch (ex) {
      dispatch({
        type : "LOGIN_ERROR",
        payload : "Virheellinen tunnus tai salasana"
      })
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("sauma_auth")

    dispatch({ type : "LOGOUT" })
  }
}
