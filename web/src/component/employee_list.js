import React from "react"
import { Table } from "semantic-ui-react"
import { Link } from "react-router-dom"

const toRow = (e) => (
  <Table.Row key={e.id}>
    <Table.Cell content={
      <Link to={`/employees/${e.id}`}>
        {`${e.lastName}, ${e.firstName}`}
      </Link>}
    />
    <Table.Cell
      content={e.administrator ? "X" : ""}
      textAlign="center"
    />
    <Table.Cell
      content={e.enabled ? "X" : ""}
      textAlign="center"
    />
  </Table.Row>
)

const EmployeeList = ({ employees }) => (
  <Table singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell content="Nimi" />
        <Table.HeaderCell content="Työnjohtaja" />
        <Table.HeaderCell content="Käyttöoikeudet" />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {employees.map(e => toRow(e))}
    </Table.Body>
  </Table>
)

export default EmployeeList
