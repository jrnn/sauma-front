import React from "react"
import SearchField from "./widgets/search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (c) => (
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
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      as={Link}
      content="Lisää uusi"
      fluid
      to="/clients/new"
    />
)

const ClientList = (props) => {
  let { admin, clients, filter, onChange } = props

  return (
    <div>
      <SearchField
        onChange={onChange}
        value={filter}
      />
      <List divided relaxed>
        {clients.map(asRow)}
      </List>
      {buttons(admin)}
    </div>
  )
}

export default ClientList
