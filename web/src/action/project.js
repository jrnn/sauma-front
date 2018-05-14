import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/projects"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_PROJECTS",
  FETCH_OK : "FETCH_PROJECTS_OK",
  FETCH_ERROR : "FETCH_PROJECTS_ERROR",
  WRITE : "WRITE_PROJECT",
  WRITE_ERROR : "WRITE_PROJECT_ERROR",
  WRITE_INVALID : "WRITE_PROJECT_INVALID",
  WRITE_RESET : "RESET_WRITE_PROJECT",
  CREATED : "CREATE_PROJECT_OK",
  UPDATED : "UPDATE_PROJECT_OK",
  ASSIGNED : "ASSIGN_EMPLOYEE_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

/*
 *  ACTION CREATORS
 */
const assignEmployeeOk = (project, employee) => ({
  type : types.ASSIGNED,
  payload : { project, employee }
})

export const resetWriteProject = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
const fetchProjects = (token) => {
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

export const fetchProjectsIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "projects") )
      dispatch(fetchProjects(token))
    else
      return Promise.resolve()
  }
}

export const createProject = (project, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, project, bearer(token))

      dispatch(resetWriteProject())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Uusi työmaa lisätty", "ok"))
      history.replace(`/projects/${res.data.id}`)

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

export const updateProject = (id, project, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, project, bearer(token))

      dispatch(resetWriteProject())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Työmaan tiedot päivitetty", "ok"))

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

export const assignEmployeeToProject = (id, employee, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(`${url}/${id}/employees`, employee, bearer(token))

      dispatch(resetWriteProject())
      dispatch(assignEmployeeOk(res.data, employee.id))
      dispatch(notify("Työntekijä osoitettu työmaalle", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch(actions.writeError())
      dispatch(notify(error.message, "error"))
    }
  }
}
