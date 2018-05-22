import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { clientRow } from "../../component/lists/list_rows"
import { connect } from "react-redux"
import { filterClients } from "../../component/lists/list_filters"

const ClientsContainer = ({ admin, clients }) =>
  <div>
    <ListContainer
      entities={clients}
      filter={filterClients}
      toRow={clientRow}
    />
    <LinkButton
      active={admin}
      href="/clients/new"
      label="Lisää uusi asiakas"
    />
  </div>

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    clients : state.clients.data.items
  }
)

ClientsContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  clients : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(ClientsContainer)
