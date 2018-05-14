import AddressForm from "../../component/address_form"
import EmployeeForm from "../../component/employee_form"
import React from "react"
import { addressState, employeeState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteEmployee } from "../../action/employee"

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

  componentWillUnmount = () =>
    this.props.resetWriteEmployee()

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
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { auth, errors, pending } = this.props

    let buttons = ( !auth.admin )
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
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        <Form.Group widths="equal">
          <Form.Checkbox
            checked={this.state.administrator}
            label="Työnjohtaja"
            name="administrator"
            onChange={this.handleChange}
            readOnly={( !auth.admin )}
          />
          <Form.Checkbox
            checked={this.state.enabled}
            label="Käyttöoikeudet"
            name="enabled"
            onChange={this.handleChange}
            readOnly={( !auth.admin )}
          />
        </Form.Group>
        <Divider hidden />
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

export default connect(
  mapStateToProps,
  { resetWriteEmployee }
)(EmployeeFormContainer)
