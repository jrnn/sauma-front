import React from "react"
import SearchField from "./widgets/search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (m) => (
  <List.Item
    as={Link}
    key={m.id}
    to={`/materials/${m.id}`}
  >
    <List.Icon
      color="grey"
      name="cube"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={m.name}
      />
      <List.Description
        content={`${m.unitCost}€ / ${m.unit}`}
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
      to="/materials/new"
    />
)

const MaterialList = (props) => {
  let { admin, filter, materials, onChange } = props

  return (
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
}

export default MaterialList
