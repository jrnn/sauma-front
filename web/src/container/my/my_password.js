import PasswordForm from "../../component/forms/password_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { changePassword } from "../../action/employee"
import { connect } from "react-redux"

const initState = {
  password : "",
  newPassword : "",
  confirmPassword : ""
}

class MyPasswordContainer extends React.Component {
  constructor() {
    super()
    this.state = initState
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()

    let { id, token } = this.props.auth
    this.props.changePassword(id, this.state, token)

    this.setState(initState)
  }

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <PasswordForm
        errors={this.props.errors}
        onChange={this.handleChange}
        state={this.state}
      />
      <Divider hidden />
      <Button content="Vaihda" fluid />
    </Form>
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

MyPasswordContainer.propTypes = {
  auth : PropTypes.object.isRequired,
  changePassword : PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  { changePassword }
)(MyPasswordContainer)
