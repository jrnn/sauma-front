import EmployeeList from "../../component/lists/employee_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class EmployeeListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterEmployees = () => {
    let { filter } = this.state

    return this.props.employees
      .filter(e =>
        `${e.lastName}, ${e.firstName}`
          .toLowerCase().includes(filter))
      .sort((e1, e2) =>
        e1.lastName.localeCompare(e2.lastName))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <EmployeeList
      admin={this.props.admin}
      employees={this.filterEmployees()}
      filter={this.state.filter}
      onChange={this.handleFilter}
    />
}

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    employees : state.employees.data.items
  }
)

EmployeeListContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(EmployeeListContainer)
