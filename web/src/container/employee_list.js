import EmployeeList from "../component/employee_list"
import React from "react"
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
      <h1 align="center">LOADING ...</h1>
    )

    if ( error.message ) return (
      <h1 align="center">{error.message}</h1>
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
