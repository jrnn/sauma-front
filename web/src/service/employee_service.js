import authService from "./auth_service"
import axios from "axios"

const url = "/api/employees"

const findAll = async () => {
  let res = await axios.get(url, authService.getConfig())

  return res.data
}

export default { findAll }
