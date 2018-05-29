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

export const forgot = (email, actionOnSuccess) => {
  return async (dispatch) => {
    dispatch({ type : "FORGOT" })

    try {
      await axios
        .post(`${url}/forgot`, { email })

      dispatch({ type : "FORGOT_OK" })
      dispatch(notify("Ohjeet lähetetty sähköpostiin", "ok"))
      if ( actionOnSuccess ) actionOnSuccess()

    } catch (ex) {
      dispatch({
        type : "FORGOT_ERROR",
        payload : "Tuntematon email tai suljettu käyttäjätunnus"
      })
    }
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

export const resetPassword = (passwords, token, history) => {
  return async (dispatch) => {
    dispatch({ type : "LOGIN" })

    try {
      await axios
        .post(`${url}/reset/${token}`, passwords)

      dispatch({ type : "LOGIN_OK" })
      dispatch(notify("Salasana vaihdettu", "ok"))

      history.replace("/")
      dispatch(logout())

    } catch (ex) {
      let { ValidationError } = ex.response.data
      let error = ( ValidationError )
        ? ValidationError.newPassword
        : "Virheellinen tai vanhentunut tunniste"

      dispatch({
        type : "LOGIN_ERROR",
        payload : error
      })
    }
  }
}
