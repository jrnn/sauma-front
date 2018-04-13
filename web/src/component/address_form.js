import FormError from "./form_error"
import React from "react"
import { Container, Form, Input } from "semantic-ui-react"

const AddressForm = ({ errors, onChange, state }) => (
  <Container>
    <Form.Field error={errors["address.street"] !== undefined}>
      <label>Osoite</label>
      <Input
        name="street"
        onChange={onChange}
        placeholder="Saumakuja 3"
        value={state.address.street}
      />
    </Form.Field>
    <Form.Field error={errors["address.street"] !== undefined}>
      <Input
        name="streetExt"
        onChange={onChange}
        value={state.address.streetExt}
      />
      <FormError error={errors["address.street"]} />
    </Form.Field>
    <Form.Group widths="equal">
      <Form.Field error={errors["address.zipCode"] !== undefined}>
        <label>Postinumero</label>
        <Input
          name="zipCode"
          onChange={onChange}
          placeholder="01300"
          value={state.address.zipCode}
        />
        <FormError error={errors["address.zipCode"]} />
      </Form.Field>
      <Form.Field error={errors["address.city"] !== undefined}>
        <label>Kaupunki</label>
        <Input
          name="city"
          onChange={onChange}
          placeholder="Saumala"
          value={state.address.city}
        />
        <FormError error={errors["address.city"]} />
      </Form.Field>
    </Form.Group>
    <Form.Field error={errors["address.country"] !== undefined}>
      <label>Valtio</label>
      <Input
        name="country"
        onChange={onChange}
        placeholder="Suomi"
        value={state.address.country}
      />
      <FormError error={errors["address.country"]} />
    </Form.Field>
  </Container>
)

export default AddressForm
