import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
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
      <Form.Field error={errors.domicile !== undefined}>
        <label>Kotipaikka</label>
        <Input
          name="domicile"
          onChange={onChange}
          placeholder="Saumala"
          readOnly={readOnly}
          value={state.domicile}
        />
        <FormError error={errors.domicile} />
      </Form.Field>
    </div>
  )
}

ClientForm.propTypes = {
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  readOnly : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired,
}

export default ClientForm
