import FormError from "../form_error"
import React from "react"
import { Form, Input } from "semantic-ui-react"

const ClientForm = (props) => {
  let { errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field error={errors.legalEntity !== undefined}>
        <label>Toiminimi</label>
        <Input
          name="legalEntity"
          onChange={onChange}
          placeholder="Firma Oy"
          readOnly={readOnly}
          value={state.legalEntity}
        />
        <FormError error={errors.legalEntity} />
      </Form.Field>
      <Form.Field error={errors.businessId !== undefined}>
        <label>Y-tunnus</label>
        <Input
          name="businessId"
          onChange={onChange}
          placeholder="1234567-8"
          readOnly={readOnly}
          value={state.businessId}
        />
        <FormError error={errors.businessId} />
      </Form.Field>
      <Form.Field error={errors.contactPerson !== undefined}>
        <label>Yhteyshenkilö</label>
        <Input
          name="contactPerson"
          onChange={onChange}
          placeholder="Paavo Pesusieni"
          readOnly={readOnly}
          value={state.contactPerson}
        />
        <FormError error={errors.contactPerson} />
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
          placeholder="paavo@firma.io"
          readOnly={readOnly}
          value={state.email}
        />
        <FormError error={errors.email} />
      </Form.Field>
    </div>
  )
}

export default ClientForm
