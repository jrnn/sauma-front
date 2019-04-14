import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/employees"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_EMPLOYEES",
  FETCH_OK : "FETCH_EMPLOYEES_OK",
  FETCH_ERROR : "FETCH_EMPLOYEES_ERROR",
  WRITE : "WRITE_EMPLOYEE",
  WRITE_ERROR : "WRITE_EMPLOYEE_ERROR",
  WRITE_INVALID : "WRITE_EMPLOYEE_INVALID",
  WRITE_RESET : "RESET_WRITE_EMPLOYEE",
  CREATED : "CREATE_EMPLOYEE_OK",
  UPDATED : "UPDATE_EMPLOYEE_OK",
  ASSIGNED : "ASSIGN_EMPLOYEE_OK",
  UNASSIGNED : "UNASSIGN_EMPLOYEE_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

export const resetWriteEmployee = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
const fetchEmployees = (token) => {
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

export const fetchEmployeesIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "employees") )
      dispatch(fetchEmployees(token))
    else
      return Promise.resolve()
  }
}

export const createEmployee = (employee, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, employee, bearer(token))

      dispatch(resetWriteEmployee())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Uusi työntekijä lisätty", "ok"))
      history.replace(`/employees/${res.data.id}`)

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

export const updateEmployee = (id, employee, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, employee, bearer(token))

      dispatch(resetWriteEmployee())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Työntekijän tiedot päivitetty", "ok"))

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

export const changePassword = (id, passwords, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      await axios
        .put(`${url}/${id}/password`, passwords, bearer(token))

      dispatch(resetWriteEmployee())
      dispatch(notify("Salasana vaihdettu", "ok"))

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
