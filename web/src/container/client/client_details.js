import ClientFormContainer from "./client_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { createClient, updateClient } from "../../action/client"
import { withRouter } from "react-router-dom"

class ClientDetailsContainer extends React.Component {
  save = (client) => {
    let { history, id, isNew, token } = this.props

    return ( isNew )
      ? this.props.createClient(client, token, history)
      : this.props.updateClient(id, client, token)
  }

  render = () =>
    <ClientFormContainer
      client={this.props.client}
      onSubmit={this.save}
    />
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

ClientDetailsContainer.propTypes = {
  client : PropTypes.object.isRequired,
  createClient : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  token : PropTypes.string.isRequired,
  updateClient : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createClient, updateClient }
)(ClientDetailsContainer))
