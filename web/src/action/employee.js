import axios from "axios"
import { bearer, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/employees"

/*
 *  ACTION CREATORS
 */
const requestEmployees = () =>
  ({ type : "REQUEST_EMPLOYEES" })

const requestEmployeesOk = (employees) => ({
  type : "REQUEST_EMPLOYEES_OK",
  payload : employees
})

const requestEmployeesError = (error) => ({
  type : "REQUEST_EMPLOYEES_ERROR",
  payload : error
})

const writeEmployee = () =>
  ({ type : "WRITE_EMPLOYEE" })

const writeEmployeeError = () =>
  ({ type : "WRITE_EMPLOYEE_ERROR" })

const writeEmployeeInvalid = (validationErrors) => ({
  type : "WRITE_EMPLOYEE_INVALID",
  payload : validationErrors
})

const createEmployeeOk = (employee) => ({
  type : "CREATE_EMPLOYEE_OK",
  payload : employee
})

const updateEmployeeOk = (employee) => ({
  type : "UPDATE_EMPLOYEE_OK",
  payload : employee
})

export const resetEmployees = () =>
  ({ type : "RESET_EMPLOYEES" })

export const resetWriteEmployee = () =>
  ({ type : "RESET_WRITE_EMPLOYEE" })

/*
 *  THUNKS
 */
export const fetchEmployees = (token) => {
  return async (dispatch) => {
    dispatch(requestEmployees())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestEmployeesOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestEmployeesError(error.message))
    }
  }
}

export const createEmployee = (employee, token) => {
  return async (dispatch) => {
    dispatch(writeEmployee())

    try {
      let res = await axios
        .post(url, employee, bearer(token))

      dispatch(resetWriteEmployee())
      dispatch(createEmployeeOk(res.data))
      dispatch(notify("Uusi työntekijä lisätty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeEmployeeInvalid(error.validation))
      else
        dispatch(writeEmployeeError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateEmployee = (id, employee, token) => {
  return async (dispatch) => {
    dispatch(writeEmployee())

    try {
      let res = await axios
        .put(`${url}/${id}`, employee, bearer(token))

      dispatch(resetWriteEmployee())
      dispatch(updateEmployeeOk(res.data))
      dispatch(notify("Työntekijän tiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeEmployeeInvalid(error.validation))
      else
        dispatch(writeEmployeeError())

      dispatch(notify(error.message, "error"))
    }
  }
}
