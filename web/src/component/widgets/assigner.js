import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Dropdown, Form } from "semantic-ui-react"

const Assigner = (props) =>
  ( !props.active )
    ? null
    : <div>
      <Divider />
      <Form onSubmit={props.onSubmit}>
        <Form.Field>
          <label>{props.label}</label>
          <Dropdown
            onChange={props.onChange}
            options={props.options}
            placeholder={props.placeholder}
            search={true}
            selection
            value={props.selected}
          />
        </Form.Field>
        <Button content={props.button} fluid />
      </Form>
    </div>

Assigner.propTypes = {
  active : PropTypes.bool.isRequired,
  button : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  options : PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder : PropTypes.string,
  selected : PropTypes.string.isRequired
}

export default Assigner
