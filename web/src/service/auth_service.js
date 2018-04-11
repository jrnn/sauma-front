import axios from "axios"

const url = "/api/login"
let token = null

const setToken = (newToken) => token = `bearer ${newToken}`

const getConfig = () => ({
  headers : { "Authorization" : token }
})

const login = async (creds) => {
  let res = await axios.post(url, creds)

  return res.data
}

export default {
  getConfig,
  login,
  setToken
}
