import axios from "axios"
import { bearer, cacheLifespan, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/tasks"

/*
 *  ACTION CREATORS
 */
const requestTasks = () =>
  ({ type : "REQUEST_TASKS" })

const requestTasksOk = (tasks) => ({
  type : "REQUEST_TASKS_OK",
  payload : tasks
})

const requestTasksError = (error) => ({
  type : "REQUEST_TASKS_ERROR",
  payload : error
})

const writeTask = () =>
  ({ type : "WRITE_TASK" })

const writeTaskError = () =>
  ({ type : "WRITE_TASK_ERROR" })

const writeTaskInvalid = (validationErrors) => ({
  type : "WRITE_TASK_INVALID",
  payload : validationErrors
})

const createTaskOk = (task) => ({
  type : "CREATE_TASK_OK",
  payload : task
})

const updateTaskOk = (task) => ({
  type : "UPDATE_TASK_OK",
  payload : task
})

export const resetWriteTask = () =>
  ({ type : "RESET_WRITE_TASK" })

/*
 *  THUNKS
 */
export const fetchTasks = (token) => {
  return async (dispatch) => {
    dispatch(requestTasks())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestTasksOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestTasksError(error.message))
    }
  }
}

export const fetchTasksIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetchTasks(getState()) )
      dispatch(fetchTasks(token))
    else
      return Promise.resolve()
  }
}

export const createTask = (task, token, history) => {
  return async (dispatch) => {
    dispatch(writeTask())

    try {
      let res = await axios
        .post(url, task, bearer(token))

      dispatch(resetWriteTask())
      dispatch(createTaskOk(res.data))
      dispatch(notify("Tehtävä lisätty", "ok"))
      history.replace(`/tasks/${res.data.id}`)

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeTaskInvalid(error.validation))
      else
        dispatch(writeTaskError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateTask = (id, task, token) => {
  return async (dispatch) => {
    dispatch(writeTask())

    try {
      let res = await axios
        .put(`${url}/${id}`, task, bearer(token))

      dispatch(resetWriteTask())
      dispatch(updateTaskOk(res.data))
      dispatch(notify("Tehtävä päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeTaskInvalid(error.validation))
      else
        dispatch(writeTaskError())

      dispatch(notify(error.message, "error"))
    }
  }
}

/*
 *  HELPERS
 */
const shouldFetchTasks = (state) => {
  let { data } = state.tasks

  if ( !data.updated || data.pending )
    return false

  return ( cacheLifespan < (Date.now() - data.updated) )
}
