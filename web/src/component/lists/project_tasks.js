import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, List } from "semantic-ui-react"
import { formatDate } from "../../util/parser"
import { Link } from "react-router-dom"

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

const buttons = (admin, id) =>
  ( !admin )
    ? null
    : <div>
      <Divider />
      <Button
        as={Link}
        content="Lisää uusi"
        fluid
        to={`/tasks/new?id=${id}`}
      />
    </div>

const ProjectTasks = (props) =>
  <div>
    <List divided relaxed>
      {( props.tasks.length > 0 )
        ? props.tasks.map(asRow)
        : <EmptyList />
      }
    </List>
    {buttons(props.admin, props.id)}
  </div>

ProjectTasks.propTypes = {
  admin : PropTypes.bool.isRequired,
  id : PropTypes.string.isRequired,
  tasks : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectTasks
