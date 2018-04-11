import axios from "axios"

const url = "/api/login"
let token = null

const getToken = () => token
const setToken = (newToken) => token = `bearer ${newToken}`

const login = async (creds) => {
  let res = await axios.post(url, creds)

  return res.data
}

export default {
  getToken,
  login,
  setToken
}
