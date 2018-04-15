import React from "react"
import SearchField from "./search_field"
import { Button, Container, Table } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (p) => (
  <Table.Row key={p.id}>
    <Table.Cell content={
      <Link to={`/projects/${p.id}`}>
        {p.projectId}
      </Link>}
    />
    <Table.Cell
      content={p.client.legalEntity}
    />
    <Table.Cell
      content={p.manager.lastName}
    />
  </Table.Row>
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
  <Container>
    <p className="huom">{"Ajatuksena että admin näkee kaikki vs. taviskäyttäjä näkee ne, joihin liittyy osoitettujen tehtävien kautta. Nyt taviskäyttäjä ei vielä näe mitään."}</p>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content="Työnumero" />
          <Table.HeaderCell content="Asiakas" />
          <Table.HeaderCell content="Työnjohtaja" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {projects.map(p => asRow(p))}
      </Table.Body>
    </Table>
    {buttons(admin)}
  </Container>
)

export default ProjectList
