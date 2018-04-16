import React from "react"
import SearchField from "./search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (c) => (
  <List.Item
    key={c.id}
    as={Link}
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
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to="/clients/new"
      fluid
    />
)

const ClientList = ({ admin, clients, filter, onChange }) => (
  <div>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <List divided relaxed>
      {clients.map(c => asRow(c))}
    </List>
    {buttons(admin)}
  </div>
)

export default ClientList
