import EmployeeFormContainer from "./employee_form"
import React from "react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeDetailsContainer extends React.Component {
  save = (employee) => {
    let id = this.props.match.params.id
    let { auth, createEmployee, updateEmployee } = this.props

    if ( id === "new" )
      createEmployee(employee, auth.token)
    else
      updateEmployee(id, employee, auth.token)
  }

  render = () => {
    let { employee, match } = this.props
    let isNew = ( match.params.id === "new" )

    if ( !isNew && !employee ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <EmployeeFormContainer
        employee={employee || {}}
        onSubmit={this.save}
      />
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    employee : state.employees.data.items
      .find(e => e.id === props.match.params.id)
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeDetailsContainer))
