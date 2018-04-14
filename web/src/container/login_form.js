import LoginForm from "../component/login_form"
import React from "react"
import { connect } from "react-redux"
import { login } from "../action/auth"
import { notify } from "../action/notification"
import { withRouter } from "react-router-dom"

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

  handleSubmit = async (e) => {
    e.preventDefault()

    let { password, username } = this.state
    let { login, notify } = this.props

    try {
      await login(username, password)
      notify("Olet nyt kirjautunut sisään", "success", 5)

    } catch (ex) {
      this.setState({ password : "", username : "" })
      notify("Virheellinen tunnus tai salasana", "error", 5)
    }
  }

  render() {
    return (
      <LoginForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

export default withRouter(connect(
  null,
  { login, notify }
)(LoginFormContainer))
