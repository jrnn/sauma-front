import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/activities"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_ACTIVITIES",
  FETCH_OK : "FETCH_ACTIVITIES_OK",
  FETCH_ERROR : "FETCH_ACTIVITIES_ERROR",
  WRITE : "WRITE_ACTIVITY",
  WRITE_ERROR : "WRITE_ACTIVITY_ERROR",
  WRITE_INVALID : "WRITE_ACTIVITY_INVALID",
  WRITE_RESET : "RESET_WRITE_ACTIVITY",
  CREATED : "CREATE_ACTIVITY_OK",
  UPDATED : "UPDATE_ACTIVITY_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

export const resetWriteActivity = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
export const fetchActivities = (token) => {
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

export const fetchActivitiesIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "activities") )
      dispatch(fetchActivities(token))
    else
      return Promise.resolve()
  }
}

export const createActivity = (activity, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, activity, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Suorite lisätty", "ok"))
      history.replace(`/activities/${res.data.id}`)

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

export const updateActivity = (id, activity, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, activity, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Suoritteen tiedot päivitetty", "ok"))

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

export const signOffActivity = (id, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}/sign`, {}, bearer(token))

      dispatch(resetWriteActivity())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Suorite kirjattu hyväksytyksi", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      dispatch(actions.writeError())
      dispatch(notify(error.message, "error"))
    }
  }
}
