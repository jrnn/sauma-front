import FormError from "../form_error"
import React from "react"
import { Form, Input } from "semantic-ui-react"

const MaterialForm = (props) => {
  let { errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field error={errors.name !== undefined}>
        <label>Nimike</label>
        <Input
          name="name"
          onChange={onChange}
          placeholder="Esim. tuotenimi ja saumaleveys"
          readOnly={readOnly}
          value={state.name}
        />
        <FormError error={errors.name} />
      </Form.Field>
      <Form.Field error={errors.unit !== undefined}>
        <label>Mittayksikkö</label>
        <Input
          name="unit"
          onChange={onChange}
          placeholder="m / m³ / kpl ..."
          readOnly={readOnly}
          value={state.unit}
        />
        <FormError error={errors.unit} />
      </Form.Field>
      <Form.Field error={errors.unitCost !== undefined}>
        <label>Yksikkökustannus</label>
        <Input
          icon="eur"
          iconPosition="left"
          name="unitCost"
          onChange={onChange}
          placeholder="13.37"
          readOnly={readOnly}
          value={state.unitCost}
        />
        <FormError error={errors.unitCost} />
      </Form.Field>
    </div>
  )
}

export default MaterialForm
