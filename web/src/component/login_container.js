import LoginForm from "./login_form"
import React from "react"
import { connect } from "react-redux"
import { login, notify } from "../reducer/actions"

class LoginContainer extends React.Component {
  constructor() {
    super()
    this.state = { username : "", password : "", disabled : true }
  }

  handleInput = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleLogin = async (e) => {
    e.preventDefault()
    let { username, password } = this.state

    try {
      await this.props.login(username, password)
      this.props.notify("Olet nyt kirjautunut sisään", "success", 5)
    } catch (ex) {
      this.setState({ username : "", password : "" })
      this.props.notify("Virheellinen tunnus tai salasana", "error", 5)
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
  { login, notify }
)(LoginContainer)
