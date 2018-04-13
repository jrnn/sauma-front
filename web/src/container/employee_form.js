import AddressForm from "../component/address_form"
import EmployeeForm from "../component/employee_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../action/employee"
import { withRouter } from "react-router-dom"

const initAddress = (e) => (
  {
    street : e.street || "",
    streetExt : e.streetExt || "",
    zipCode : e.zipCode || "",
    city : e.city || "",
    country : e.country || ""
  }
)

const initState = (e) => (
  {
    address : initAddress(e.address || {}),
    administrator : e.administrator || false,
    email : e.email || "",
    enabled : e.enabled || true,
    firstName : e.firstName || "",
    lastName : e.lastName || "",
    phone : e.phone || "",
    username : e.username || ""
  }
)

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
    let { pending, validationErrors } = this.props

    return (
      <Form loading={pending} onSubmit={this.handleSubmit}>
        <EmployeeForm
          errors={validationErrors.message || {}}
          onChange={this.handleChange}
          state={this.state}
        />
        <AddressForm
          errors={validationErrors.message || {}}
          onChange={this.handleAddressChange}
          state={this.state}
        />
        <Divider hidden />
        <Button
          content="Tallenna"
          fluid
        />
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    validationErrors : state.employees.validation.error,
    pending : state.employees.validation.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeFormContainer))
