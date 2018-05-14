import React from "react"
import SearchField from "./search_field"
import { Button, List } from "semantic-ui-react"
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
      as={Link}
      content="Lisää uusi"
      fluid
      to="/projects/new"
    />
)

const ProjectList = (props) => {
  let { admin, filter, onChange, projects } = props

  return (
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
}

export default ProjectList
