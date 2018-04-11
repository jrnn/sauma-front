import React from "react"
import { connect } from "react-redux"
import { Message } from "semantic-ui-react"

const Notification = ({ notification }) => {
  if ( !notification )
    return null

  let isError = notification.type === "error"

  return (
    <Message positive={!isError} negative={isError}>
      <Message.Header content={notification.content} />
    </Message>
  )
}

const mapStateToProps = (state) =>
  ({ notification : state.notification })

export default connect(
  mapStateToProps
)(Notification)
