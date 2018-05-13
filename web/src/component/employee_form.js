import FormError from "./form_error"
import React from "react"
import { Form, Input } from "semantic-ui-react"

const EmployeeForm = ({ errors, onChange, readOnly, state }) => (
  <div>
    <Form.Field error={errors.username !== undefined}>
      <label>Käyttäjätunnus</label>
      <Input
        name="username"
        onChange={onChange}
        placeholder="Tällä kirjaudutaan sisään"
        readOnly={readOnly}
        value={state.username}
      />
      <FormError error={errors.username} />
    </Form.Field>
    <Form.Field error={errors.firstName !== undefined}>
      <label>Etunimi</label>
      <Input
        name="firstName"
        onChange={onChange}
        placeholder="Spongebob"
        readOnly={readOnly}
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
        readOnly={readOnly}
        value={state.lastName}
      />
      <FormError error={errors.lastName} />
    </Form.Field>
    <Form.Field error={errors.phone !== undefined}>
      <label>Puhelin</label>
      <Input
        name="phone"
        onChange={onChange}
        placeholder="040-123-4567"
        readOnly={readOnly}
        value={state.phone}
      />
      <FormError error={errors.phone} />
    </Form.Field>
    <Form.Field error={errors.email !== undefined}>
      <label>Email</label>
      <Input
        name="email"
        onChange={onChange}
        placeholder="sponge.bob@sauma.io"
        readOnly={readOnly}
        value={state.email}
      />
      <FormError error={errors.email} />
    </Form.Field>
  </div>
)

export default EmployeeForm
