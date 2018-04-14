import axios from "axios"
import { bearer, errorHandler } from "./helper"

const url = "/api/employees"

export const getEmployees = (token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_EMPLOYEES" })

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch({
        type : "GET_EMPLOYEES_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_EMPLOYEES_FAIL",
        error : error.message
      })
    }
  }
}

export const getEmployee = (id, token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_EMPLOYEE" })

    try {
      let res = await axios
        .get(`${url}/${id}`, bearer(token))

      dispatch({
        type : "GET_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_EMPLOYEE_FAIL",
        error : error.message
      })
    }
  }
}

export const createEmployee = (employee, token) => {
  return async (dispatch) => {
    dispatch({ type : "CREATE_EMPLOYEE" })

    try {
      let res = await axios
        .post(url, employee, bearer(token))

      dispatch({
        type : "CREATE_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "EMPLOYEE_VALIDATION_FAIL"
        : "CREATE_EMPLOYEE_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const updateEmployee = (id, employee, token) => {
  return async (dispatch) => {
    dispatch({ type : "UPDATE_EMPLOYEE" })

    try {
      let res = await axios
        .put(`${url}/${id}`, employee, bearer(token))

      dispatch({
        type : "UPDATE_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "EMPLOYEE_VALIDATION_FAIL"
        : "UPDATE_EMPLOYEE_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const resetEmployees = () =>
  ({ type : "RESET_EMPLOYEES" })

export const resetEmployee = () =>
  ({ type : "RESET_EMPLOYEE" })
