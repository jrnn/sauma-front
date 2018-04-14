import ClientList from "../component/client_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getClients, resetClients } from "../action/client"
import { withRouter } from "react-router-dom"

class ClientListContainer extends React.Component {
  componentDidMount = () =>
    this.props.getClients(this.props.auth.token)

  componentWillUnmount = () =>
    this.props.resetClients()

  render() {
    let { clients, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <ClientList clients={clients} />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    clients : state.clients.all.data,
    error : state.clients.all.error,
    pending : state.clients.all.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { getClients, resetClients }
)(ClientListContainer))
