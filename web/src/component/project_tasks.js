import React from "react"
import { Button, List } from "semantic-ui-react"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"

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

const buttons = (admin, projectId) => (
  ( !admin )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to={`/tasks/new?id=${projectId}`}
      fluid
    />
)

const ProjectTasks = ({ admin, projectId, tasks }) => (
  <div>
    <List divided relaxed>
      {tasks.map(t => asRow(t))}
    </List>
    {buttons(admin, projectId)}
  </div>
)

export default ProjectTasks
