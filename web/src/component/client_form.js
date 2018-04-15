import FormError from "./form_error"
import React from "react"
import { Container, Form, Input } from "semantic-ui-react"

const ClientForm = ({ errors, onChange, state }) => (
  <Container>
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
    <Form.Group>
      <Form.Field error={errors.businessId !== undefined} width="5">
        <label>Y-tunnus</label>
        <Input
          name="businessId"
          onChange={onChange}
          placeholder="1234567-8"
          value={state.businessId}
        />
        <FormError error={errors.businessId} />
      </Form.Field>
      <Form.Field error={errors.contactPerson !== undefined} width="11">
        <label>Yhteyshenkilö</label>
        <Input
          name="contactPerson"
          onChange={onChange}
          placeholder="Spongebob Squarepants"
          value={state.contactPerson}
        />
        <FormError error={errors.contactPerson} />
      </Form.Field>
    </Form.Group>
    <Form.Group>
      <Form.Field error={errors.phone !== undefined} width="5">
        <label>Puhelin</label>
        <Input
          name="phone"
          onChange={onChange}
          placeholder="040-123-4567"
          value={state.phone}
        />
        <FormError error={errors.phone} />
      </Form.Field>
      <Form.Field error={errors.email !== undefined} width="11">
        <label>Email</label>
        <Input
          name="email"
          onChange={onChange}
          placeholder="sponge.bob@sauma.io"
          value={state.email}
        />
        <FormError error={errors.email} />
      </Form.Field>
    </Form.Group>
  </Container>
)

export default ClientForm
