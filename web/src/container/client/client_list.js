import ClientList from "../../component/client_list"
import React from "react"
import { connect } from "react-redux"

class ClientListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterClients = () => {
    let { filter } = this.state
    let { clients } = this.props

    return clients
      .filter(c =>
        c.businessId.toLowerCase().includes(filter) ||
        c.legalEntity.toLowerCase().includes(filter))
      .sort((c1, c2) =>
        c1.legalEntity.localeCompare(c2.legalEntity))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () => {
    return (
      <ClientList
        admin={this.props.auth.admin}
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
    clients : state.clients.data.items
  }
)

export default connect(
  mapStateToProps,
  null
)(ClientListContainer)
