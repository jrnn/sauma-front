import React from "react"
import { Table } from "semantic-ui-react"
import { Link } from "react-router-dom"

const toRow = (c) => (
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

const ClientList = ({ clients }) => (
  <Table singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell content="Toiminimi" />
        <Table.HeaderCell content="Työmaita" />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {clients.map(c => toRow(c))}
    </Table.Body>
  </Table>
)

export default ClientList
