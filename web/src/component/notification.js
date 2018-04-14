import React from "react"
import { connect } from "react-redux"
import { Message } from "semantic-ui-react"

const Notification = ({ notification }) => {
  if ( !notification.message )
    return null

  let error = notification.type === "error"

  return (
    <Message positive={!error} negative={error}>
      <Message.Header
        content={notification.message}
      />
    </Message>
  )
}

const mapStateToProps = (state) =>
  ({ notification : state.notification })

export default connect(
  mapStateToProps
)(Notification)
