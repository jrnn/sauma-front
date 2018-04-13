import FormError from "./form_error"
import React from "react"
import { Container, Form, Input } from "semantic-ui-react"

const EmployeeForm = ({ errors, onChange, state }) => (
  <Container>
    <Form.Field error={errors.username !== undefined}>
      <label>Käyttäjätunnus</label>
      <Input
        name="username"
        onChange={onChange}
        placeholder="Tällä kirjaudutaan sisään"
        value={state.username}
      />
      <FormError error={errors.username} />
    </Form.Field>
    <Form.Group widths="equal">
      <Form.Field error={errors.firstName !== undefined}>
        <label>Etunimi</label>
        <Input
          name="firstName"
          onChange={onChange}
          placeholder="Spongebob"
          value={state.firstName}
        />
        <FormError error={errors.firstName} />
      </Form.Field>
      <Form.Field error={errors.lastName !== undefined}>
        <label>Sukunimi</label>
        <Input
          name="lastName"
          onChange={onChange}
          placeholder="Squarepants"
          value={state.lastName}
        />
        <FormError error={errors.lastName} />
      </Form.Field>
    </Form.Group>
    <Form.Field error={errors.email !== undefined}>
      <label>Email</label>
      <Input
        name="email"
        onChange={onChange}
        placeholder="sponge.bob@sauma.io"
        value={state.email}
      />
      <FormError error={errors.email} />
    </Form.Field>
    <Form.Field error={errors.phone !== undefined}>
      <label>Puhelin</label>
      <Input
        name="phone"
        onChange={onChange}
        placeholder="040-123-4567"
        value={state.phone}
      />
      <FormError error={errors.phone} />
    </Form.Field>
    <Form.Group className="padded" widths="equal">
      <Form.Checkbox
        label="Työnjohtaja"
        checked={state.administrator}
        name="administrator"
        onChange={onChange}
      />
      <Form.Checkbox
        label="Käyttöoikeudet"
        checked={state.enabled}
        name="enabled"
        onChange={onChange}
      />
    </Form.Group>
  </Container>
)

export default EmployeeForm
