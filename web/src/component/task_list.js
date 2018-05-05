import React from "react"
import SearchField from "./search_field"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (t) => (
  <List.Item
    key={t.id}
    as={Link}
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
        content={`${t.project.projectId} — ${t.description.substring(0, 33)}...`}
      />
      <List.Description
        content={`${formatDate(t.startDate)}—${formatDate(t.endDate)}`}
      />
    </List.Content>
  </List.Item>
)

const TaskList = ({ filter, onChange, tasks }) => (
  <div>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <List divided relaxed>
      {tasks.map(t => asRow(t))}
    </List>
  </div>
)

export default TaskList
