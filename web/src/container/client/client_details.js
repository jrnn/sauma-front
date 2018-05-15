import ClientFormContainer from "./client_form"
import React from "react"
import { connect } from "react-redux"
import { createClient, updateClient } from "../../action/client"
import { withRouter } from "react-router-dom"

class ClientDetailsContainer extends React.Component {
  save = (client) => {
    let { history, id, isNew, token } = this.props

    if ( isNew )
      this.props.createClient(client, token, history)
    else
      this.props.updateClient(id, client, token)
  }

  render = () => {
    return (
      <ClientFormContainer
        client={this.props.client}
        onSubmit={this.save}
      />
    )
  }
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

export default withRouter(connect(
  mapStateToProps,
  { createClient, updateClient }
)(ClientDetailsContainer))
