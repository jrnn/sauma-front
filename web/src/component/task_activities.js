import React from "react"
import { Button, List } from "semantic-ui-react"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"

const asRow = (a) => (
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
)

const TaskActivities = ({ activities, readOnly, task }) => (
  <div>
    <List divided relaxed>
      {activities.map(a => asRow(a))}
    </List>
    {( readOnly || task.completed )
      ? null
      : <Button
        as={Link}
        content="Lisää uusi"
        fluid
        to={`/activities/new?id=${task.id}`}
      />
    }
  </div>
)

export default TaskActivities
