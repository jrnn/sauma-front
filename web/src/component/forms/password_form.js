import FormError from "../alerts/form_error"
import PasswordReqs from "../alerts/password_reqs"
import PropTypes from "prop-types"
import React from "react"
import { Form, Input, Popup } from "semantic-ui-react"

const reqsPopup = (comp) =>
  <Popup
    content={<PasswordReqs />}
    header="Vaatimukset"
    on="focus"
    trigger={comp}
  />

const PasswordForm = (props) => {
  let { errors, onChange, state } = props

  return (
    <div>
      <Form.Field error={errors.password !== undefined}>
        <label>Nykyinen salasana</label>
        <Input
          name="password"
          onChange={onChange}
          placeholder="qwerty"
          type="password"
          value={state.password}
        />
        <FormError error={errors.password} />
      </Form.Field>
      <Form.Field error={errors.newPassword !== undefined}>
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
      <Form.Field error={errors.newPassword !== undefined}>
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
        <FormError error={errors.newPassword} />
      </Form.Field>
    </div>
  )
}

PasswordForm.propTypes = {
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  state : PropTypes.object.isRequired
}

export default PasswordForm
