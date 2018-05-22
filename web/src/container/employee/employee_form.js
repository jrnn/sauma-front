import AddressFormContainer from "../address_form"
import EmployeeForm from "../../component/forms/employee_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../../action/employee"
import { employeeState } from "../../util/form_state"
import { withRouter } from "react-router-dom"

class EmployeeFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = employeeState(props.employee)
  }

  handleChange = (e, data) => {
    let value = ( data.type === "checkbox" )
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { history, id, isNew, token } = this.props
    this.props.save(this.state, history, id, isNew, token)
  }

  syncAddressState = (address) =>
    this.setState({ ...this.state, address })

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <EmployeeForm
        errors={this.props.errors}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        state={this.state}
      />
      <Divider hidden />
      <AddressFormContainer
        address={this.state.address}
        errors={this.props.errors}
        readOnly={this.props.readOnly}
        sync={this.syncAddressState}
      />
      <Divider hidden />
      <Form.Group widths="equal">
        <Form.Checkbox
          checked={this.state.administrator}
          label="Työnjohtaja"
          name="administrator"
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
        />
        <Form.Checkbox
          checked={this.state.enabled}
          label="Käyttöoikeudet"
          name="enabled"
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
        />
      </Form.Group>
      <Divider hidden />
      {( this.props.readOnly )
        ? null
        : <Button content="Tallenna" fluid />
      }
    </Form>
}

const mapStateToProps = (state) => (
  {
    errors : state.employees.write.errors,
    pending : state.employees.write.pending,
    readOnly : ( !state.auth.admin ),
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, token) => {
      ( isNew )
        ? dispatch(createEmployee(data, token, history))
        : dispatch(updateEmployee(id, data, token))
    }
  }
)

EmployeeFormContainer.propTypes = {
  employee : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  pending : PropTypes.bool.isRequired,
  readOnly : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeFormContainer))
