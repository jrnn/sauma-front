import EmployeeList from "../../component/employee_list"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class EmployeeListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterEmployees = () =>
    this.props.employees
      .filter(e =>
        `${e.lastName}, ${e.firstName}`
          .toLowerCase()
          .includes(this.state.filter))
      .sort((e1, e2) =>
        e1.lastName.localeCompare(e2.lastName))

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

export default withRouter(connect(
  mapStateToProps,
  null
)(EmployeeListContainer))
