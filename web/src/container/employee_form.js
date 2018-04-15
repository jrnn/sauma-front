import AddressForm from "../component/address_form"
import EmployeeForm from "../component/employee_form"
import React from "react"
import { addressState, employeeState } from "../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../action/employee"
import { withRouter } from "react-router-dom"

const initState = (e) => {
  let state = employeeState(e)
  state.address = addressState(e.address || {})

  return state
}

class EmployeeFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.employee)
  }

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value
    this.setState({ ...this.state, address })
  }

  handleChange = (e, data) => {
    let value = data.type === "checkbox"
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let { auth, createEmployee, isNew, updateEmployee } = this.props

    if ( isNew )
      createEmployee(this.state, auth.token)
    else
      updateEmployee(this.props.employee.id, this.state, auth.token)
  }

  render() {
    let { errors, pending, readOnly } = this.props

    let buttons = ( readOnly )
      ? null
      : <Button content="Tallenna" fluid />

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <EmployeeForm
          errors={errors}
          onChange={this.handleChange}
          readOnly={readOnly}
          state={this.state}
        />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.employees.validation.error,
    pending : state.employees.validation.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeFormContainer))
