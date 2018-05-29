import Expandable from "../component/widgets/expandable"
import ForgotForm from "../component/forms/forgot_form"
import LoginForm from "../component/forms/login_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Divider } from "semantic-ui-react"
import { forgot, login } from "../action/auth"

class LoginFormContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      email : "",
      password : "",
      username : ""
    }
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleForgot = (e) => {
    e.preventDefault()
    this.props.forgot(this.state.email, this.expandable.toggle)
  }

  handleLogin = (e) => {
    e.preventDefault()
    let { password, username } = this.state

    this.props.login(username, password)
    this.setState({ password : "", username : "" })
  }

  render = () =>
    <div>
      <LoginForm
        error={this.props.error}
        onChange={this.handleChange}
        onSubmit={this.handleLogin}
        pending={this.props.pending}
        state={this.state}
      />
      <Divider />
      <Expandable
        button="Unohtuiko salasana?"
        ref={c => this.expandable = c}
      >
        <ForgotForm
          error={this.props.forgotError}
          onChange={this.handleChange}
          onSubmit={this.handleForgot}
          pending={this.props.forgotPending}
          state={this.state}
        />
      </Expandable>
    </div>
}

const mapStateToProps = (state) => (
  {
    error : state.auth.error,
    forgotError : state.auth.forgotError,
    forgotPending : state.auth.forgotPending,
    pending : state.auth.pending
  }
)

LoginFormContainer.propTypes = {
  error : PropTypes.string,
  forgot : PropTypes.func.isRequired,
  forgotError : PropTypes.string,
  forgotPending : PropTypes.bool.isRequired,
  login : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  { forgot, login }
)(LoginFormContainer)
