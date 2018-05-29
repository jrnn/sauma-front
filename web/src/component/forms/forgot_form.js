import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Button, Form, Input } from "semantic-ui-react"

const ForgotForm = ({ error, onChange, onSubmit, pending, state }) =>
  <Form
    loading={pending}
    onSubmit={onSubmit}
  >
    <Form.Field error={error !== null}>
      <label>Anna käyttäjätunnukseesi sidottu email</label>
      <Input
        name="email"
        onChange={onChange}
        placeholder="paavo@firma.io"
        value={state.email}
      />
      <FormError error={error} />
    </Form.Field>
    <Button
      content="Pyydä uusi salasana"
      fluid
    />
  </Form>

ForgotForm.propTypes = {
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default ForgotForm
