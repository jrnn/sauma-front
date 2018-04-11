import React from "react"
import { Button, Container, Form } from "semantic-ui-react"

const LoginForm = ({ onChange, onSubmit, state }) => {
  let { username, password } = state
  const disabled = username.length === 0 || password.length === 0

  return (
    <Container>
      <h2 className="padded">Kirjaudu sisään</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Käyttäjätunnus</label>
          <input
            name="username"
            onChange={onChange}
            placeholder="spongebob"
            type="text"
            value={state.username}
          />
        </Form.Field>
        <Form.Field>
          <label>Salasana</label>
          <input
            name="password"
            onChange={onChange}
            placeholder="qwerty"
            type="password"
            value={state.password}
          />
        </Form.Field>
        <Button
          content="Kirjaudu"
          disabled={disabled}
          fluid
        />
      </Form>
    </Container>
  )
}

export default LoginForm
