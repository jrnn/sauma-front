import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Form, Input } from "semantic-ui-react"

const AddressForm = (props) => {
  let { errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field error={errors["address.street"] !== undefined}>
        <label>Osoite</label>
        <Input
          name="street"
          onChange={onChange}
          placeholder="Saumakuja 313"
          readOnly={readOnly}
          value={state.street}
        />
      </Form.Field>
      <Form.Field error={errors["address.street"] !== undefined}>
        <Input
          name="streetExt"
          onChange={onChange}
          readOnly={readOnly}
          value={state.streetExt}
        />
        <FormError error={errors["address.street"]} />
      </Form.Field>
      <Form.Field error={errors["address.zipCode"] !== undefined}>
        <label>Postinumero</label>
        <Input
          name="zipCode"
          onChange={onChange}
          placeholder="01300"
          readOnly={readOnly}
          value={state.zipCode}
        />
        <FormError error={errors["address.zipCode"]} />
      </Form.Field>
      <Form.Field error={errors["address.city"] !== undefined}>
        <label>Kaupunki</label>
        <Input
          name="city"
          onChange={onChange}
          placeholder="Saumala"
          readOnly={readOnly}
          value={state.city}
        />
        <FormError error={errors["address.city"]} />
      </Form.Field>
      <Form.Field error={errors["address.country"] !== undefined}>
        <label>Valtio</label>
        <Input
          name="country"
          onChange={onChange}
          placeholder="Suomi"
          readOnly={readOnly}
          value={state.country}
        />
        <FormError error={errors["address.country"]} />
      </Form.Field>
    </div>
  )
}

AddressForm.propTypes = {
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  readOnly : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired,
}

export default AddressForm
