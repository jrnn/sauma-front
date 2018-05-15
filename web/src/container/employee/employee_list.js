import EmployeeList from "../../component/employee_list"
import React from "react"
import { connect } from "react-redux"

class EmployeeListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterEmployees = () => {
    let { filter } = this.state
    let { employees } = this.props

    return employees
      .filter(e =>
        `${e.lastName}, ${e.firstName}`
          .toLowerCase().includes(filter))
      .sort((e1, e2) =>
        e1.lastName.localeCompare(e2.lastName))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () => {
    return (
      <EmployeeList
        admin={this.props.auth.admin}
        employees={this.filterEmployees()}
        filter={this.state.filter}
        onChange={this.handleFilter}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    employees : state.employees.data.items
  }
)

export default connect(
  mapStateToProps,
  null
)(EmployeeListContainer)
