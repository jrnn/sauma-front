import React from "react"
import SearchField from "./search_field"
import { Button, Container, Table } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) => (
  <Table.Row key={e.id}>
    <Table.Cell content={
      <Link to={`/employees/${e.id}`}>
        {`${e.lastName}, ${e.firstName}`}
      </Link>}
    />
    <Table.Cell
      content={( e.administrator )
        ? <span>&times;</span>
        : null
      }
      textAlign="center"
    />
    <Table.Cell
      content={( e.enabled )
        ? <span>&times;</span>
        : null
      }
      textAlign="center"
    />
  </Table.Row>
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      content="Lisää uusi"
      as={Link} to="/employees/new"
      fluid
    />
)

const EmployeeList = ({ admin, employees, filter, onChange }) => (
  <Container>
    <SearchField
      onChange={onChange}
      value={filter}
    />
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content="Nimi" />
          <Table.HeaderCell content="Työnjohtaja" />
          <Table.HeaderCell content="Käyttöoikeudet" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {employees.map(e => asRow(e))}
      </Table.Body>
    </Table>
    {buttons(admin)}
  </Container>
)

export default EmployeeList
