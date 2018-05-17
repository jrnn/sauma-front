import axios from "axios"
import fileDownload from "js-file-download"
import { errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/blobs"

/*
 *  ACTION TYPES
 */
export const types = {
  REQUEST_START : "ATTACHMENT_START",
  REQUEST_OVER : "ATTACHMENT_OVER",
}

/*
 *  ACTION CREATORS
 */
const attachmentStart = () =>
  ({ type : types.REQUEST_START })

const attachmentOver = () =>
  ({ type : types.REQUEST_OVER })

/*
 *  THUNKS
 */
export const fetchAttachment = (id, token) => {
  return async (dispatch) => {
    dispatch(attachmentStart())

    try {
      let res = await axios.get(
        `${url}/${id}`,
        {
          headers : { "authorization" : `bearer ${token}` },
          responseType : "blob"
        }
      )
      let name = decodeURI(res.headers["content-disposition"].split("filename=")[1])
      let mime = res.headers["content-type"]
      fileDownload(res.data, name, mime)

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(notify(error.message, "error"))
    }

    dispatch(attachmentOver())
  }
}

export const uploadAttachment = (id, payload, token, updateThunk, actionOnSuccess) => {
  return async (dispatch) => {
    dispatch(attachmentStart())

    try {
      let res = await axios.post(
        url,
        payload,
        {
          headers : {
            "authorization" : `bearer ${token}`,
            "content-type" : "multipart/form-data"
          }
        }
      )
      dispatch(updateThunk(id, { attachments : res.data }, token))
      if ( actionOnSuccess ) actionOnSuccess()

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(notify(error.message, "error"))
    }

    dispatch(attachmentOver())
  }
}
