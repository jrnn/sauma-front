import FormError from "../alerts/form_error"
import React from "react"
import { Button, Form, Input } from "semantic-ui-react"

const LoginForm = ({ error, loading, onChange, onSubmit, state }) => {
  let { password, username } = state
  let isDisabled = ( password.length === 0 || username.length === 0 )

  return (
    <div>
      <h2 className="padded">Kirjaudu sisään</h2>
      <Form
        loading={loading}
        onSubmit={onSubmit}
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
        <p className="huom">{"Tähän 'Forgot password?' josta emailiin vahvistuslinkki"}</p>
      </Form>
    </div>
  )
}

export default LoginForm
