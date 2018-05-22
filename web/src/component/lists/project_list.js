import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (p) =>
  <List.Item
    as={Link}
    key={p.id}
    to={`/projects/${p.id}`}
  >
    <List.Icon
      color="grey"
      name="industry"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${p.projectId} — ${p.name}`}
      />
      <List.Description
        content={p.client.legalEntity}
      />
    </List.Content>
  </List.Item>

const ProjectList = ({ projects }) =>
  <List divided relaxed>
    {( projects.length > 0 )
      ? projects.map(asRow)
      : <EmptyList />
    }
  </List>

ProjectList.propTypes = {
  projects : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectList
