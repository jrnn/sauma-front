import EmployeeFormContainer from "./employee_form"
import React from "react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeDetailsContainer extends React.Component {
  save = (employee) => {
    let { history, id, isNew, token } = this.props

    if ( isNew )
      this.props.createEmployee(employee, token, history)
    else
      this.props.updateEmployee(id, employee, token)
  }

  render = () => {
    return (
      <EmployeeFormContainer
        employee={this.props.employee}
        onSubmit={this.save}
      />
    )
  }
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeDetailsContainer))
