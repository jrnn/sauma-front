import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Button, Form, TextArea } from "semantic-ui-react"

const CommentForm = (props) =>
  <Form
    loading={props.pending}
    onSubmit={props.onSubmit}
  >
    <Form.Field error={props.error !== null}>
      <label>Lisää huomio</label>
      <TextArea
        autoHeight
        onChange={props.onChange}
        placeholder="Korkeintaan 255 merkkiä"
        style={{ minHeight : 50 }}
        value={props.text}
      />
      <FormError error={props.error} />
    </Form.Field>
    <Button
      content="Tallenna"
      disabled={props.error !== null}
      fluid
    />
  </Form>

CommentForm.propTypes = {
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  pending : PropTypes.bool.isRequired,
  text : PropTypes.string.isRequired
}

export default CommentForm
