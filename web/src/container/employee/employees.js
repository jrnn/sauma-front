import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { employeeRow } from "../../component/lists/list_rows"
import { filterEmployees } from "../../component/lists/list_filters"

const EmployeesContainer = ({ admin, employees }) =>
  <div>
    <ListContainer
      entities={employees}
      filter={filterEmployees}
      toRow={employeeRow}
    />
    <LinkButton
      active={admin}
      href="/employees/new"
      label="Lisää uusi henkilö"
    />
  </div>

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    employees : state.employees.data.items
  }
)

EmployeesContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(EmployeesContainer)
