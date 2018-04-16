import React from "react"
import SearchField from "./search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (p) => (
  <List.Item
    key={p.id}
    as={Link}
    to={`/projects/${p.id}`}
  >
    <List.Icon
      color="grey"
      name="industry"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={p.projectId}
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
    : <Button
      content="Lisää uusi"
      as={Link} to="/projects/new"
      fluid
    />
)

const ProjectList = ({ admin, filter, onChange, projects }) => (
  <div>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <List divided relaxed>
      {projects.map(p => asRow(p))}
    </List>
    {buttons(admin)}
  </div>
)

export default ProjectList
