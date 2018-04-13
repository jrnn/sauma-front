import React from "react"
import { Button, Container, Form } from "semantic-ui-react"

const LoginForm = ({ onChange, onSubmit, state }) => {
  let { password, username } = state
  let isDisabled = password.length === 0 || username.length === 0

  return (
    <Container>
      <h2 className="padded">Kirjaudu sisään</h2>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label="Käyttäjätunnus"
          name="username"
          onChange={onChange}
          placeholder="spongebob"
          value={username}
        />
        <Form.Input
          label="Salasana"
          name="password"
          onChange={onChange}
          placeholder="qwerty"
          type="password"
          value={password}
        />
        <Button
          content="Kirjaudu"
          disabled={isDisabled}
          fluid
        />
      </Form>
    </Container>
  )
}

export default LoginForm
