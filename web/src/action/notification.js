const timeout = 5000

export const notify = (message, type) => {
  return async (dispatch) => {
    setTimeout(() =>
      dispatch({
        type : "HIDE_NOTIFICATION"
      }),
    timeout)

    dispatch({
      type : "SET_NOTIFICATION",
      payload : {
        message,
        type
      }
    })
  }
}
