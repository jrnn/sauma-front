import React from "react"
import { connect } from "react-redux"
import { Table } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"

const EmployeeList = ({ employees }) => {
  const toRow = (e) => (
    <Table.Row key={e.id} disabled={!e.enabled}>
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

  return (
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
}

const mapStateToProps = (state) =>
  ({ employees : state.employees })

export default withRouter(connect(
  mapStateToProps
)(EmployeeList))
