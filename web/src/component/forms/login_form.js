import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Button, Form, Input } from "semantic-ui-react"

const LoginForm = (props) => {
  let { error, onChange, state } = props
  let { password, username } = state
  let isDisabled = ( password.length === 0 || username.length === 0 )

  return (
    <div>
      <h2 className="padded">Kirjaudu sisään</h2>
      <Form
        loading={props.pending}
        onSubmit={props.onSubmit}
      >
        <Form.Field error={error !== null}>
          <label>Käyttäjätunnus</label>
          <Input
            name="username"
            onChange={onChange}
            placeholder="spongebob"
            value={username}
          />
        </Form.Field>
        <Form.Field error={error !== null}>
          <label>Salasana</label>
          <Input
            name="password"
            onChange={onChange}
            placeholder="qwerty"
            type="password"
            value={password}
          />
          <FormError error={error} />
        </Form.Field>
        <Button
          content="Kirjaudu"
          disabled={isDisabled}
          fluid
        />
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default LoginForm
