import EmployeeList from "../component/employee_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getEmployees, resetEmployees } from "../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeListContainer extends React.Component {
  componentDidMount = () =>
    this.props.getEmployees(this.props.auth.token)

  componentWillUnmount = () =>
    this.props.resetEmployees()

  render() {
    let { employees, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <EmployeeList employees={employees} />
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
