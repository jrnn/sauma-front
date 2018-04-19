import ClientFormContainer from "./client_form"
import React from "react"
import { connect } from "react-redux"
import { createClient, updateClient } from "../../action/client"
import { withRouter } from "react-router-dom"

class ClientDetailsContainer extends React.Component {
  save = (client) => {
    let id = this.props.match.params.id
    let { auth, createClient, updateClient } = this.props

    if ( id === "new" )
      createClient(client, auth.token)
    else
      updateClient(id, client, auth.token)
  }

  render = () => {
    let { client, match } = this.props
    let isNew = ( match.params.id === "new" )

    if ( !isNew && !client ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <ClientFormContainer
        client={client || {}}
        onSubmit={this.save}
      />
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    client : state.clients.data.items
      .find(c => c.id === props.match.params.id)
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createClient, updateClient }
)(ClientDetailsContainer))
