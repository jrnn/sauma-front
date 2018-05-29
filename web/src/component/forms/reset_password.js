import FormError from "../alerts/form_error"
import PasswordReqs from "../alerts/password_reqs"
import PropTypes from "prop-types"
import React from "react"
import { Button, Form, Input, Popup } from "semantic-ui-react"

const reqsPopup = (comp) =>
  <Popup
    content={<PasswordReqs />}
    header="Vaatimukset"
    on="focus"
    trigger={comp}
  />

const ResetPasswordForm = ({ error, onChange, onSubmit, pending, state }) =>
  <Form
    loading={pending}
    onSubmit={onSubmit}
  >
    <Form.Field error={error !== null}>
      <label>Uusi salasana</label>
      {reqsPopup(
        <Input
          name="newPassword"
          onChange={onChange}
          placeholder="trustno1"
          type="password"
          value={state.newPassword}
        />
      )}
    </Form.Field>
    <Form.Field error={error !== null}>
      <label>Vahvista uusi salasana</label>
      {reqsPopup(
        <Input
          name="confirmPassword"
          onChange={onChange}
          placeholder="trustno1 (eli sama uudestaan)"
          type="password"
          value={state.confirmPassword}
        />
      )}
      <FormError error={error} />
    </Form.Field>
    <Button
      content="Vaihda"
      fluid
    />
  </Form>

ResetPasswordForm.propTypes = {
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default ResetPasswordForm
