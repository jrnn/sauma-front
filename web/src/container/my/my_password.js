import PasswordForm from "../../component/password_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { changePassword } from "../../action/employee"

const initState = {
  password : "",
  newPassword : "",
  confirmPassword : ""
}

class MyPasswordContainer extends React.Component {
  constructor(props) {
    super(props)
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

  render = () => {
    let { errors, pending } = this.props

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <PasswordForm
          errors={errors}
          onChange={this.handleChange}
          state={this.state}
        />
        <Divider hidden />
        <Button content="Vaihda" fluid />
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

export default connect(
  mapStateToProps,
  { changePassword }
)(MyPasswordContainer)
