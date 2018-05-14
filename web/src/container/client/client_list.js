import ClientList from "../../component/client_list"
import React from "react"
import { connect } from "react-redux"

class ClientListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterClients = () =>
    this.props.clients
      .filter(c =>
        c.legalEntity.toLowerCase()
          .includes(this.state.filter))
      .sort((c1, c2) =>
        c1.legalEntity.localeCompare(c2.legalEntity))

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
