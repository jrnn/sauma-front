import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { formatDate } from "../../util/parser"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (t) =>
  <List.Item
    as={Link}
    key={t.id}
    to={`/tasks/${t.id}`}
  >
    <List.Icon
      color="grey"
      name={( t.completed )
        ? "check circle outline"
        : "circle outline"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${t.project.projectId} — ${t.name}`}
      />
      <List.Description
        content={`${formatDate(t.startDate)} — ${formatDate(t.endDate)}`}
      />
    </List.Content>
  </List.Item>

const TaskList = ({ tasks }) =>
  <List divided relaxed>
    {( tasks.length > 0 )
      ? tasks.map(asRow)
      : <EmptyList />
    }
  </List>

TaskList.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaskList
