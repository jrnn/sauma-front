import FormError from "../../component/form_error"
import PasswordReqs from "../../component/password_reqs"
import React from "react"
import { connect } from "react-redux"
import { Button, Form, Input, Popup } from "semantic-ui-react"

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

    this.props.onSubmit(this.state)
    this.setState(initState)
  }

  render = () => {
    let { errors } = this.props

    let requirementsPopup = (comp) => (
      <Popup
        content={<PasswordReqs />}
        header="Vaatimukset"
        on="focus"
        trigger={comp}
      />
    )

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field error={errors.password !== undefined}>
          <label>Nykyinen salasana</label>
          <Input
            name="password"
            onChange={this.handleChange}
            placeholder="qwerty"
            type="password"
            value={this.state.password}
          />
          <FormError error={errors.password} />
        </Form.Field>
        <Form.Field error={errors.newPassword !== undefined}>
          <label>Uusi salasana</label>
          {requirementsPopup(
            <Input
              name="newPassword"
              onChange={this.handleChange}
              placeholder="trustno1"
              type="password"
              value={this.state.newPassword}
            />
          )}
        </Form.Field>
        <Form.Field error={errors.newPassword !== undefined}>
          <label>Vahvista uusi salasana</label>
          {requirementsPopup(
            <Input
              name="confirmPassword"
              onChange={this.handleChange}
              placeholder="trustno1 (eli sama uudestaan)"
              type="password"
              value={this.state.confirmPassword}
            />
          )}
          <FormError error={errors.newPassword} />
        </Form.Field>
        <Button content="Vaihda" fluid />
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.employees.write.errors,
    pending : state.employees.write.pending
  }
)

export default connect(
  mapStateToProps,
  null
)(MyPasswordContainer)
