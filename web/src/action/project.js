import axios from "axios"
import { bearer, errorHandler } from "./helper"

const url = "/api/projects"

export const getProjects = (token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_PROJECTS" })

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch({
        type : "GET_PROJECTS_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_PROJECTS_FAIL",
        error : error.message
      })
    }
  }
}

export const getProject = (id, token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_PROJECT" })

    try {
      let res = await axios
        .get(`${url}/${id}`, bearer(token))

      dispatch({
        type : "GET_PROJECT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch({
        type : "GET_PROJECT_FAIL",
        error : error.message
      })
    }
  }
}

export const createProject = (project, token) => {
  return async (dispatch) => {
    dispatch({ type : "CREATE_PROJECT" })

    try {
      let res = await axios
        .post(url, project, bearer(token))

      dispatch({
        type : "CREATE_PROJECT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "PROJECT_VALIDATION_FAIL"
        : "CREATE_PROJECT_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const updateProject = (id, project, token) => {
  return async (dispatch) => {
    dispatch({ type : "UPDATE_PROJECT" })

    try {
      let res = await axios
        .put(`${url}/${id}`, project, bearer(token))

      dispatch({
        type : "UPDATE_PROJECT_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "PROJECT_VALIDATION_FAIL"
        : "UPDATE_PROJECT_FAIL"

      dispatch({
        type,
        error : error.message
      })
    }
  }
}

export const resetProjects = () =>
  ({ type : "RESET_PROJECTS" })

export const resetProject = () =>
  ({ type : "RESET_PROJECT" })
