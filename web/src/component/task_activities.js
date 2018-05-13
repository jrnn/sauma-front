import React from "react"
import { Button, List } from "semantic-ui-react"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"

const asRow = (a) => (
  <List.Item
    key={a.id}
    as={Link}
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
)

const buttons = (canAdd, taskCompleted, taskId) => (
  ( !canAdd || taskCompleted )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to={`/activities/new?id=${taskId}`}
      fluid
    />
)

const TaskActivities = ({ activities, canAdd, task }) => (
  <div>
    <List divided relaxed>
      {activities.map(a => asRow(a))}
    </List>
    {buttons(canAdd, task.completed, task.id)}
  </div>
)

export default TaskActivities
