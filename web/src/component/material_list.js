import React from "react"
import SearchField from "./search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (m) => (
  <List.Item
    key={m.id}
    as={Link}
    to={`/materials/${m.id}`}
  >
    <List.Icon
      color="grey"
      name="cube"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={( m.color )
          ? `${m.name} (${m.color})`
          : m.name
        }
      />
      <List.Description
        content={`${m.unitCost}€ per ${m.unit}`}
      />
    </List.Content>
  </List.Item>
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to="/materials/new"
      fluid
    />
)

const MaterialList = ({ admin, filter, materials, onChange }) => (
  <div>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <List divided relaxed>
      {materials.map(m => asRow(m))}
    </List>
    {buttons(admin)}
  </div>
)

export default MaterialList
