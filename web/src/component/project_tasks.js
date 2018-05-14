import React from "react"
import { Button, List } from "semantic-ui-react"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"

const asRow = (t) => (
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
)

const buttons = (admin, id) => (
  ( !admin )
    ? null
    : <Button
      as={Link}
      content="Lisää uusi"
      fluid
      to={`/tasks/new?id=${id}`}
    />
)

const ProjectTasks = (props) => {
  let { admin, id, tasks } = props

  return (
    <div>
      <List divided relaxed>
        {tasks.map(t => asRow(t))}
      </List>
      {buttons(admin, id)}
    </div>
  )
}

export default ProjectTasks
