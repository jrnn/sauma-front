import axios from "axios"
import { bearer, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/clients"

/*
 *  ACTION CREATORS
 */
const requestClients = () =>
  ({ type : "REQUEST_CLIENTS" })

const requestClientsOk = (clients) => ({
  type : "REQUEST_CLIENTS_OK",
  payload : clients
})

const requestClientsError = (error) => ({
  type : "REQUEST_CLIENTS_ERROR",
  payload : error
})

const writeClient = () =>
  ({ type : "WRITE_CLIENT" })

const writeClientError = () =>
  ({ type : "WRITE_CLIENT_ERROR" })

const writeClientInvalid = (validationErrors) => ({
  type : "WRITE_CLIENT_INVALID",
  payload : validationErrors
})

const createClientOk = (client) => ({
  type : "CREATE_CLIENT_OK",
  payload : client
})

const updateClientOk = (client) => ({
  type : "UPDATE_CLIENT_OK",
  payload : client
})

export const resetClients = () =>
  ({ type : "RESET_CLIENTS" })

export const resetWriteClient = () =>
  ({ type : "RESET_WRITE_CLIENT" })

/*
 *  THUNKS
 */
export const fetchClients = (token) => {
  return async (dispatch) => {
    dispatch(requestClients())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestClientsOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestClientsError(error.message))
    }
  }
}

export const createClient = (client, token) => {
  return async (dispatch) => {
    dispatch(writeClient())

    try {
      let res = await axios
        .post(url, client, bearer(token))

      dispatch(resetWriteClient())
      dispatch(createClientOk(res.data))
      dispatch(notify("Uusi asiakas lisätty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeClientInvalid(error.validation))
      else
        dispatch(writeClientError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateClient = (id, client, token) => {
  return async (dispatch) => {
    dispatch(writeClient())

    try {
      let res = await axios
        .put(`${url}/${id}`, client, bearer(token))

      dispatch(resetWriteClient())
      dispatch(updateClientOk(res.data))
      dispatch(notify("Asiakkaan tiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeClientInvalid(error.validation))
      else
        dispatch(writeClientError())

      dispatch(notify(error.message, "error"))
    }
  }
}
