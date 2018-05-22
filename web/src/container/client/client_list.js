import ClientList from "../../component/lists/client_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"

class ClientListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterClients = () => {
    let { filter } = this.state

    return this.props.clients
      .filter(c =>
        c.businessId.toLowerCase().includes(filter) ||
        c.legalEntity.toLowerCase().includes(filter))
      .sort((c1, c2) =>
        c1.legalEntity.localeCompare(c2.legalEntity))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <ClientList
        clients={this.filterClients()}
      />
    </div>
}

ClientListContainer.propTypes = {
  employees : PropTypes.arrayOf(PropTypes.object)
}

export default ClientListContainer
