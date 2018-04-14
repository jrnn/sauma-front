export const notify = (message, type, timeout) => {
  return async (dispatch) => {
    setTimeout(() =>
      dispatch({
        type : "HIDE_NOTIFICATION"
      }),
      (timeout * 1000))

    dispatch({
      type : "SET_NOTIFICATION",
      data : {
        message,
        type
      }
    })
  }
}
