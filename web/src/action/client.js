import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/clients"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_CLIENTS",
  FETCH_OK : "FETCH_CLIENTS_OK",
  FETCH_ERROR : "FETCH_CLIENTS_ERROR",
  WRITE : "WRITE_CLIENT",
  WRITE_ERROR : "WRITE_CLIENT_ERROR",
  WRITE_INVALID : "WRITE_CLIENT_INVALID",
  WRITE_RESET : "RESET_WRITE_CLIENT",
  CREATED : "CREATE_CLIENT_OK",
  UPDATED : "UPDATE_CLIENT_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

export const resetWriteClient = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
const fetchClients = (token) => {
  return async (dispatch) => {
    dispatch(actions.fetch())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(actions.fetchOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(actions.fetchError(error.message))
    }
  }
}

export const fetchClientsIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "clients") )
      dispatch(fetchClients(token))
    else
      return Promise.resolve()
  }
}

export const createClient = (client, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, client, bearer(token))

      dispatch(resetWriteClient())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Uusi asiakas lisätty", "ok"))
      history.replace(`/clients/${res.data.id}`)

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(actions.writeInvalid(error.validation))
      else
        dispatch(actions.writeError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateClient = (id, client, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, client, bearer(token))

      dispatch(resetWriteClient())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Asiakkaan tiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(actions.writeInvalid(error.validation))
      else
        dispatch(actions.writeError())

      dispatch(notify(error.message, "error"))
    }
  }
}
