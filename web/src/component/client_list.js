import React from "react"
import SearchField from "./search_field"
import { Button, Container, Table } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (c) => (
  <Table.Row key={c.id}>
    <Table.Cell content={
      <Link to={`/clients/${c.id}`}>
        {c.legalEntity}
      </Link>}
    />
    <Table.Cell
      content="N/A"
      textAlign="center"
    />
  </Table.Row>
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to="/clients/new"
      fluid
    />
)

const ClientList = ({ admin, clients, filter, onChange }) => (
  <Container>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content="Toiminimi" />
          <Table.HeaderCell content="Työmaita" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {clients.map(c => asRow(c))}
      </Table.Body>
    </Table>
    {buttons(admin)}
  </Container>
)

export default ClientList
