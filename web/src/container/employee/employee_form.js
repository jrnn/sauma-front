import AddressForm from "../../component/address_form"
import EmployeeForm from "../../component/employee_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { employeeState } from "../../util/form_state"

class EmployeeFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = employeeState(props.employee)
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { errors, pending, readOnly } = this.props

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
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        <Form.Group widths="equal">
          <Form.Checkbox
            checked={this.state.administrator}
            label="Työnjohtaja"
            name="administrator"
            onChange={this.handleChange}
            readOnly={readOnly}
          />
          <Form.Checkbox
            checked={this.state.enabled}
            label="Käyttöoikeudet"
            name="enabled"
            onChange={this.handleChange}
            readOnly={readOnly}
          />
        </Form.Group>
        <Divider hidden />
        {( readOnly )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.employees.write.errors,
    pending : state.employees.write.pending,
    readOnly : ( !state.auth.admin )
  }
)

export default connect(
  mapStateToProps,
  null
)(EmployeeFormContainer)
