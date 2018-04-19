import React from "react"
import { connect } from "react-redux"
import { Header, Modal } from "semantic-ui-react"

const Notification = ({ notification }) => {
  if ( !notification.message )
    return null

  let error = ( notification.type === "error" )

  return (
    <Modal
      basic
      closeOnDimmerClick={true}
      defaultOpen={true}
      size="mini"
    >
      <Header
        color={( error )
          ? "red"
          : "green"
        }
        content={notification.message}
        icon={( error )
          ? "warning sign"
          : "checkmark"
        }
        inverted
      />
    </Modal>
  )
}

const mapStateToProps = (state) =>
  ({ notification : state.notification })

export default connect(
  mapStateToProps
)(Notification)
