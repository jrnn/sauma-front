import EmployeeFormContainer from "./employee_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeDetailsContainer extends React.Component {
  save = (employee) => {
    let { history, id, isNew, token } = this.props

    return ( isNew )
      ? this.props.createEmployee(employee, token, history)
      : this.props.updateEmployee(id, employee, token)
  }

  render = () =>
    <EmployeeFormContainer
      employee={this.props.employee}
      onSubmit={this.save}
    />
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

EmployeeDetailsContainer.propTypes = {
  createEmployee : PropTypes.func.isRequired,
  employee : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  token : PropTypes.string.isRequired,
  updateEmployee : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeDetailsContainer))
