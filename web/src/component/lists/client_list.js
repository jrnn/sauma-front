import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (c) =>
  <List.Item
    as={Link}
    key={c.id}
    to={`/clients/${c.id}`}
  >
    <List.Icon
      color="grey"
      name="suitcase"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={c.legalEntity}
      />
      <List.Description
        content={c.businessId}
      />
    </List.Content>
  </List.Item>

const ClientList = ({ clients }) =>
  <List divided relaxed>
    {( clients.length > 0 )
      ? clients.map(asRow)
      : <EmptyList />
    }
  </List>

ClientList.propTypes = {
  clients : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ClientList
