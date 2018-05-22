import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { List } from "semantic-ui-react"

const CommonList = ({ entities, toRow }) =>
  <List divided relaxed>
    {( entities.length > 0 )
      ? entities.map(toRow)
      : <EmptyList />
    }
  </List>

CommonList.propTypes = {
  entities : PropTypes.arrayOf(PropTypes.object).isRequired,
  toRow : PropTypes.func.isRequired
}

export default CommonList
