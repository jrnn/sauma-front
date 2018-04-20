import axios from "axios"
import { bearer, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/projects"

/*
 *  ACTION CREATORS
 */
const requestProjects = () =>
  ({ type : "REQUEST_PROJECTS" })

const requestProjectsOk = (projects) => ({
  type : "REQUEST_PROJECTS_OK",
  payload : projects
})

const requestProjectsError = (error) => ({
  type : "REQUEST_PROJECTS_ERROR",
  payload : error
})

const writeProject = () =>
  ({ type : "WRITE_PROJECT" })

const writeProjectError = () =>
  ({ type : "WRITE_PROJECT_ERROR" })

const writeProjectInvalid = (validationErrors) => ({
  type : "WRITE_PROJECT_INVALID",
  payload : validationErrors
})

const createProjectOk = (project) => ({
  type : "CREATE_PROJECT_OK",
  payload : project
})

const updateProjectOk = (project) => ({
  type : "UPDATE_PROJECT_OK",
  payload : project
})

export const resetProjects = () =>
  ({ type : "RESET_PROJECTS" })

export const resetWriteProject = () =>
  ({ type : "RESET_WRITE_PROJECT" })

/*
 *  THUNKS
 */
export const fetchProjects = (token) => {
  return async (dispatch) => {
    dispatch(requestProjects())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestProjectsOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestProjectsError(error.message))
    }
  }
}

export const createProject = (project, token) => {
  return async (dispatch) => {
    dispatch(writeProject())

    try {
      let res = await axios
        .post(url, project, bearer(token))

      dispatch(resetWriteProject())
      dispatch(createProjectOk(res.data))
      dispatch(notify("Uusi työntekijä lisätty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeProjectInvalid(error.validation))
      else
        dispatch(writeProjectError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateProject = (id, project, token) => {
  return async (dispatch) => {
    dispatch(writeProject())

    try {
      let res = await axios
        .put(`${url}/${id}`, project, bearer(token))

      dispatch(resetWriteProject())
      dispatch(updateProjectOk(res.data))
      dispatch(notify("Työntekijän tiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeProjectInvalid(error.validation))
      else
        dispatch(writeProjectError())

      dispatch(notify(error.message, "error"))
    }
  }
}
