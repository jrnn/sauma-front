import ClientList from "../component/client_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getClients, resetClients } from "../action/client"
import { withRouter } from "react-router-dom"

class ClientListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  componentDidMount = () =>
    this.props.getClients(this.props.auth.token)

  componentWillUnmount = () =>
    this.props.resetClients()

  filterClients = () =>
    this.props.clients
      .filter(c =>
        c.legalEntity.toLowerCase()
          .includes(this.state.filter))
      .sort((c1, c2) =>
        c1.legalEntity.localeCompare(c2.legalEntity))

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render() {
    let { auth, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <ClientList
        admin={auth.admin}
        clients={this.filterClients()}
        filter={this.state.filter}
        onChange={this.handleFilter}
      />
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
