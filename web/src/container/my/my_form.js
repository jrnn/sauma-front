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

  delete state.administrator
  delete state.enabled

  return state
}

class MyFormContainer extends React.Component {
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

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { errors, pending } = this.props

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <EmployeeForm
          errors={errors}
          onChange={this.handleChange}
          readOnly={false}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={false}
          state={this.state}
        />
        <Divider hidden />
        <Button content="Tallenna" fluid />
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

export default connect(
  mapStateToProps,
  { resetWriteEmployee }
)(MyFormContainer)
