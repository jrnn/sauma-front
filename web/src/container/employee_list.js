import EmployeeList from "../component/employee_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getEmployees, resetEmployees } from "../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  componentDidMount = () =>
    this.props.getEmployees(this.props.auth.token)

  componentWillUnmount = () =>
    this.props.resetEmployees()

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

  render() {
    let { auth, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <EmployeeList
        admin={auth.admin}
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
    employees : state.employees.all.data,
    error : state.employees.all.error,
    pending : state.employees.all.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { getEmployees, resetEmployees }
)(EmployeeListContainer))
