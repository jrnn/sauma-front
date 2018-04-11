import LoginForm from "./login_form"
import React from "react"
import { connect } from "react-redux"
import { login } from "../reducer/actions"

class LoginContainer extends React.Component {
  constructor() {
    super()
    this.state = { username : "", password : "" }
  }

  handleInput = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleLogin = async (e) => {
    e.preventDefault()
    let { username, password } = this.state

    try {
      await this.props.login(username, password)
      // set notification
    } catch (ex) {
      this.setState({ username : "", password : "" })
      // set notification
    }
  }

  render() {
    return (
      <LoginForm
        onChange={this.handleInput}
        onSubmit={this.handleLogin}
        state={this.state}
      />
    )
  }
}

export default connect(
  null,
  { login }
)(LoginContainer)
