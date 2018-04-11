import authService from "../service/auth_service"

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_AUTH" : {
      let auth = JSON.parse(
        window.localStorage.getItem("sauma_auth"))

      if ( !auth ) return null

      authService.setToken(auth.token)
      return auth
    }
    case "LOGIN" : {
      let { auth } = action

      authService.setToken(auth.token)
      window.localStorage
        .setItem("sauma_auth", JSON.stringify(auth))

      return auth
    }
    case "LOGOUT" : {
      authService.setToken(null)
      window.localStorage.removeItem("sauma_auth")

      return null
    }
    default :
      return state
  }
}

export default authReducer
