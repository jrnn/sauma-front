import LoginForm from "../component/login_form"
import React from "react"
import { connect } from "react-redux"
import { login } from "../action/auth"
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

  handleSubmit = (e) => {
    e.preventDefault()
    let { password, username } = this.state

    this.props.login(username, password)
    this.setState({ password : "", username : "" })
  }

  render = () => {
    let { error, pending } = this.props

    return (
      <LoginForm
        error={error}
        loading={pending}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.auth.error,
    pending : state.auth.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { login }
)(LoginFormContainer))
