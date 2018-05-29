import PropTypes from "prop-types"
import React from "react"
import ResetPasswordForm from "../component/forms/reset_password"
import { connect } from "react-redux"
import { resetPassword } from "../action/auth"

const initState = {
  newPassword : "",
  confirmPassword : ""
}

class ResetPasswordContainer extends React.Component {
  constructor() {
    super()
    this.state = initState
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    let { history, token } = this.props

    this.props.resetPassword(this.state, token, history)
    this.setState(initState)
  }

  render = () =>
    <div>
      <h2 className="padded">Vaihda salasana</h2>
      <ResetPasswordForm
        error={this.props.error}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        pending={this.props.pending}
        state={this.state}
      />
    </div>
}

const mapStateToProps = (state, props) => (
  {
    error : state.auth.error,
    pending : state.auth.pending,
    token : props.match.params.token
  }
)

ResetPasswordContainer.propTypes = {
  error : PropTypes.string,
  history : PropTypes.object.isRequired,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  resetPassword : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPasswordContainer)
