import AddressForm from "../../component/forms/address_form"
import EmployeeForm from "../../component/forms/employee_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { employeeState } from "../../util/form_state"
import { updateEmployee } from "../../action/employee"

const initState = (e) => {
  let state = employeeState(e)

  delete state.administrator
  delete state.enabled

  return state
}

class MyFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.employee)
  }

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value

    this.setState({ ...this.state, address })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()

    let { id, token } = this.props.auth
    this.props.updateEmployee(id, this.state, token)
  }

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <EmployeeForm
        errors={this.props.errors}
        onChange={this.handleChange}
        readOnly={false}
        state={this.state}
      />
      <Divider hidden />
      <AddressForm
        errors={this.props.errors}
        onChange={this.handleAddressChange}
        readOnly={false}
        state={this.state}
      />
      <Divider hidden />
      <Button content="Tallenna" fluid />
    </Form>
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

MyFormContainer.propTypes = {
  auth : PropTypes.object.isRequired,
  employee : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  updateEmployee : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { updateEmployee }
)(MyFormContainer)
