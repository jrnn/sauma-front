import FormError from "../form_error"
import React from "react"
import { Button, Divider, Form, Input } from "semantic-ui-react"

const AttachmentForm = (props) => {
  let { errors, onChange, onClick, onSubmit, pending, state } = props

  return (
    <Form
      loading={pending}
      onSubmit={onSubmit}
    >
      <Form.Field error={( errors.name !== null )}>
        <label>Liitteen nimi</label>
        <Input
          name="name"
          onChange={onChange}
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
        onClick={onClick}
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

export default AttachmentForm
