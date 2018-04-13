import EmployeeFormContainer from "./employee_form"
import React from "react"
import { connect } from "react-redux"
import { getEmployee, resetEmployee } from "../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeDetailsContainer extends React.Component {
  componentDidMount = () => {
    let { auth, getEmployee, isNew, match } = this.props
    if ( !isNew )
      getEmployee(match.params.id, auth.token)
  }

  componentWillUnmount = () =>
    this.props.resetEmployee()

  render() {
    let { employee, error, isNew, pending } = this.props

    if ( pending ) return (
      <h1 align="center">LOADING ...</h1>
    )

    if ( error.message ) return (
      <h1 align="center">{error.message}</h1>
    )

    return (
      <EmployeeFormContainer
        employee={employee}
        isNew={isNew}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    employee : state.employees.one.data,
    error : state.employees.one.error,
    pending : state.employees.one.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { getEmployee, resetEmployee }
)(EmployeeDetailsContainer))
