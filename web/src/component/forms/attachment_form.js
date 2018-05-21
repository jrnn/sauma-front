import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form, Input } from "semantic-ui-react"

const AttachmentForm = (props) => {
  let { errors, state } = props

  return (
    <Form
      loading={props.pending}
      onSubmit={props.onSubmit}
    >
      <Form.Field error={( errors.name !== null )}>
        <label>Liitteen nimi / kuvaus</label>
        <Input
          name="name"
          onChange={props.onChange}
          value={state.name}
        />
        <FormError error={errors.name} />
      </Form.Field>
      <Form.Field error={( errors.file !== null )}>
        <label>Valittu tiedosto</label>
        <Input
          readOnly
          value={( !state.file )
            ? ""
            : state.file.name || ""
          }
        />
        <FormError error={errors.file} />
      </Form.Field>
      <Button
        content="Valitse tiedosto"
        onClick={props.onClick}
        fluid
      />
      <Divider hidden />
      <Button
        content="Tallenna"
        disabled={( errors.name !== null || errors.file !== null )}
        fluid
      />
    </Form>
  )
}

AttachmentForm.propTypes = {
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  onClick : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default AttachmentForm
