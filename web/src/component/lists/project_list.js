import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../widgets/search_field"
import { Button, Divider, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (p) => (
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
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <div>
      <Divider />
      <Button
        as={Link}
        content="Lisää uusi"
        fluid
        to="/projects/new"
      />
    </div>
)

const ProjectList = (props) => (
  <div>
    <SearchField
      onChange={props.onChange}
      value={props.filter}
    />
    <List divided relaxed>
      {( props.projects.length > 0 )
        ? props.projects.map(asRow)
        : <EmptyList />
      }
    </List>
    {buttons(props.admin)}
  </div>
)

ProjectList.propTypes = {
  admin : PropTypes.bool.isRequired,
  filter : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectList
