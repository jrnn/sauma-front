import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Header, Modal } from "semantic-ui-react"

const Notification = ({ notification }) =>
  ( !notification.message )
    ? null
    : <Modal
      basic
      closeOnDimmerClick={true}
      defaultOpen={true}
      size="mini"
    >
      <Header
        color={( notification.type === "error" )
          ? "red"
          : "green"
        }
        content={notification.message}
        icon={( notification.type === "error" )
          ? "warning sign"
          : "checkmark"
        }
        inverted
      />
    </Modal>

const mapStateToProps = (state) =>
  ({ notification : state.notification })

Notification.propTypes = {
  notification : PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  null
)(Notification)
