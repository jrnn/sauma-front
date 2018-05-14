import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/tasks"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_TASKS",
  FETCH_OK : "FETCH_TASKS_OK",
  FETCH_ERROR : "FETCH_TASKS_ERROR",
  WRITE : "WRITE_TASK",
  WRITE_ERROR : "WRITE_TASK_ERROR",
  WRITE_INVALID : "WRITE_TASK_INVALID",
  WRITE_RESET : "RESET_WRITE_TASK",
  CREATED : "CREATE_TASK_OK",
  UPDATED : "UPDATE_TASK_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

export const resetWriteTask = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
const fetchTasks = (token) => {
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

export const fetchTasksIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "tasks") )
      dispatch(fetchTasks(token))
    else
      return Promise.resolve()
  }
}

export const createTask = (task, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, task, bearer(token))

      dispatch(resetWriteTask())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Tehtävä lisätty", "ok"))
      history.replace(`/tasks/${res.data.id}`)

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

export const updateTask = (id, task, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, task, bearer(token))

      dispatch(resetWriteTask())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Tehtävä päivitetty", "ok"))

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
