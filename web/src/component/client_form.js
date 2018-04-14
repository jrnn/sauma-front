import FormError from "./form_error"
import React from "react"
import { Container, Form, Input } from "semantic-ui-react"

const ClientForm = ({ errors, onChange, state }) => (
  <Container>
    <Form.Field error={errors.businessId !== undefined}>
      <label>Y-tunnus</label>
      <Input
        name="businessId"
        onChange={onChange}
        placeholder="1234567-8"
        value={state.businessId}
      />
      <FormError error={errors.businessId} />
    </Form.Field>
    <Form.Field error={errors.legalEntity !== undefined}>
      <label>Toiminimi</label>
      <Input
        name="legalEntity"
        onChange={onChange}
        placeholder="Firma Oy"
        value={state.legalEntity}
      />
      <FormError error={errors.legalEntity} />
    </Form.Field>
    <Form.Field error={errors.contactPerson !== undefined}>
      <label>Yhteyshenkilö</label>
      <Input
        name="contactPerson"
        onChange={onChange}
        placeholder="Spongebob Squarepants"
        value={state.contactPerson}
      />
      <FormError error={errors.contactPerson} />
    </Form.Field>
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
  </Container>
)

export default ClientForm
