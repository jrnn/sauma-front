import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (m) =>
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

const MaterialList = ({ materials }) =>
  <List divided relaxed>
    {( materials.length > 0)
      ? materials.map(asRow)
      : <EmptyList />
    }
  </List>

MaterialList.propTypes = {
  materials : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MaterialList
