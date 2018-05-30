import axios from "axios"
import { bearer, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/comments"

/*
 *  ACTION TYPES
 */
export const types = {
  REQUEST_START : "COMMENT_START",
  REQUEST_OVER : "COMMENT_OVER",
}

/*
 *  ACTION CREATORS
 */
const commentStart = () =>
  ({ type : types.REQUEST_START })

const commentOver = () =>
  ({ type : types.REQUEST_OVER })

/*
 *  THUNKS
 */
export const uploadComment = (id, data, token, updateThunk) => {
  return async (dispatch) => {
    dispatch(commentStart())

    try {
      await axios
        .post(url, data, bearer(token))

      dispatch(updateThunk(token))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(notify(error.message, "error"))
    }

    dispatch(commentOver())
  }
}
