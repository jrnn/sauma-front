import axios from "axios"
import { bearer, cacheLifespan, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/activities"

/*
 *  ACTION CREATORS
 */
const requestActivities = () =>
  ({ type : "REQUEST_ACTIVITIES" })

const requestActivitiesOk = (activities) => ({
  type : "REQUEST_ACTIVITIES_OK",
  payload : activities
})

const requestActivitiesError = (error) => ({
  type : "REQUEST_ACTIVITIES_ERROR",
  payload : error
})

const writeActivity = () =>
  ({ type : "WRITE_ACTIVITY" })

const writeActivityError = () =>
  ({ type : "WRITE_ACTIVITY_ERROR" })

const writeActivityInvalid = (validationErrors) => ({
  type : "WRITE_ACTIVITY_INVALID",
  payload : validationErrors
})

const createActivityOk = (activity) => ({
  type : "CREATE_ACTIVITY_OK",
  payload : activity
})

const updateActivityOk = (activity) => ({
  type : "UPDATE_ACTIVITY_OK",
  payload : activity
})

export const resetWriteActivity = () =>
  ({ type : "RESET_WRITE_ACTIVITY" })

/*
 *  THUNKS
 */
export const fetchActivities = (token) => {
  return async (dispatch) => {
    dispatch(requestActivities())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestActivitiesOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestActivitiesError(error.message))
    }
  }
}

export const fetchActivitiesIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetchActivities(getState()) )
      dispatch(fetchActivities(token))
    else
      return Promise.resolve()
  }
}

export const createActivity = (activity, token, history) => {
  return async (dispatch) => {
    dispatch(writeActivity())

    try {
      let res = await axios
        .post(url, activity, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(createActivityOk(res.data))
      dispatch(notify("Suorite lisätty", "ok"))
      history.replace(`/activities/${res.data.id}`)

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeActivityInvalid(error.validation))
      else
        dispatch(writeActivityError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateActivity = (id, activity, token) => {
  return async (dispatch) => {
    dispatch(writeActivity())

    try {
      let res = await axios
        .put(`${url}/${id}`, activity, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(updateActivityOk(res.data))
      dispatch(notify("Suorite päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeActivityInvalid(error.validation))
      else
        dispatch(writeActivityError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const signOffActivity = (id, token) => {
  return async (dispatch) => {
    dispatch(writeActivity())

    try {
      let res = await axios
        .put(`${url}/${id}/sign`, {}, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(updateActivityOk(res.data))
      dispatch(notify("Suorite kirjattu hyväksytyksi", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch(writeActivityError())
      dispatch(notify(error.message, "error"))
    }
  }
}

/*
 *  HELPERS
 */
const shouldFetchActivities = (state) => {
  let { data } = state.activities

  if ( !data.updated || data.pending )
    return false

  return ( cacheLifespan < (Date.now() - data.updated) )
}
