import axios from "axios"
import { bearer, errorHandler } from "./helper"

const url = "/api/clients"

export const getClients = (token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_CLIENTS" })

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch({
        type : "GET_CLIENTS_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_CLIENTS_FAIL",
        error : error.message
      })
    }
  }
}

export const getClient = (id, token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_CLIENT" })

    try {
      let res = await axios
        .get(`${url}/${id}`, bearer(token))

      dispatch({
        type : "GET_CLIENT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_CLIENT_FAIL",
        error : error.message
      })
    }
  }
}

export const createClient = (client, token) => {
  return async (dispatch) => {
    dispatch({ type : "CREATE_CLIENT" })

    try {
      let res = await axios
        .post(url, client, bearer(token))

      dispatch({
        type : "CREATE_CLIENT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "CLIENT_VALIDATION_FAIL"
        : "CREATE_CLIENT_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const updateClient = (id, client, token) => {
  return async (dispatch) => {
    dispatch({ type : "UPDATE_CLIENT" })

    try {
      let res = await axios
        .put(`${url}/${id}`, client, bearer(token))

      dispatch({
        type : "UPDATE_CLIENT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "CLIENT_VALIDATION_FAIL"
        : "UPDATE_CLIENT_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const resetClients = () =>
  ({ type : "RESET_CLIENTS" })

export const resetClient = () =>
  ({ type : "RESET_CLIENT" })
