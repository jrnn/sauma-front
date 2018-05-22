import LoginForm from "../component/forms/login_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { login } from "../action/auth"

class LoginFormContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      password : "",
      username : ""
    }
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()
    let { password, username } = this.state

    this.props.login(username, password)
    this.setState({ password : "", username : "" })
  }

  render = () =>
    <LoginForm
      error={this.props.error}
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      pending={this.props.pending}
      state={this.state}
    />
}

const mapStateToProps = (state) => (
  {
    error : state.auth.error,
    pending : state.auth.pending
  }
)

LoginFormContainer.propTypes = {
  error : PropTypes.string,
  login : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  { login }
)(LoginFormContainer)
