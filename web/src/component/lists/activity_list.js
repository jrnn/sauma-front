import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { formatDate } from "../../util/parser"
import { List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (a) =>
  <List.Item
    as={Link}
    key={a.id}
    to={`/activities/${a.id}`}
  >
    <List.Icon
      color="grey"
      name={( a.signed )
        ? "check circle outline"
        : "circle outline"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${formatDate(a.date)} — ${a.owner.lastName}, ${a.owner.firstName}`}
      />
      <List.Description
        content={`${a.hours} tuntia`}
      />
    </List.Content>
  </List.Item>

const ActivityList = ({ activities }) =>
  <List divided relaxed>
    {( activities.length > 0 )
      ? activities.map(asRow)
      : <EmptyList />
    }
  </List>

ActivityList.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ActivityList
