import LoginForm from "../component/login_form"
import React from "react"
import { connect } from "react-redux"
import { login, notify } from "../reducer/actions"
import { withRouter } from "react-router-dom"

class LoginWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      username : "",
      password : ""
    }
  }

  handleInput = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleLogin = async (e) => {
    e.preventDefault()

    let { username, password } = this.state
    let { login, notify } = this.props

    try {
      await login(username, password)
      notify("Olet nyt kirjautunut sisään", "success", 5)

    } catch (ex) {
      this.setState({ username : "", password : "" })
      notify("Virheellinen tunnus tai salasana", "error", 5)
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

export default withRouter(connect(
  null,
  { login, notify }
)(LoginWrapper))
