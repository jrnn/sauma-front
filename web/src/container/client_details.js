import ClientFormContainer from "./client_form"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getClient, resetClient } from "../action/client"
import { withRouter } from "react-router-dom"

class ClientDetailsContainer extends React.Component {
  componentDidMount = () => {
    let { auth, getClient, isNew, match } = this.props
    if ( !isNew )
      getClient(match.params.id, auth.token)
  }

  componentWillUnmount = () =>
    this.props.resetClient()

  render() {
    let { auth, client, error, isNew, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <ClientFormContainer
        client={client}
        isNew={isNew}
        readOnly={!auth.admin}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    client : state.clients.one.data,
    error : state.clients.one.error,
    pending : state.clients.one.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { getClient, resetClient }
)(ClientDetailsContainer))
