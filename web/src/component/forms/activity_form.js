import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Form, Input, TextArea } from "semantic-ui-react"

const ActivityForm = (props) => {
  let { activity, errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field>
        <label>Tehtävä</label>
        <Input
          disabled
          value={( activity.id )
            ? `${activity.project.projectId} — ${activity.task.name}`
            : `${activity.task.project.projectId} — ${activity.task.name}`
          }
        />
      </Form.Field>
      <Form.Field>
        <label>Tekijä</label>
        <Input
          disabled
          value={( activity.id )
            ? `${activity.owner.firstName} ${activity.owner.lastName}`
            : props.owner || ""
          }
        />
      </Form.Field>
      <Form.Field error={errors.description !== undefined}>
        <label>Kuvaus</label>
        <TextArea
          autoHeight
          name="description"
          onChange={onChange}
          placeholder="Kirjoita kuvaus mitä tehty"
          readOnly={readOnly}
          style={{ minHeight : 100 }}
          value={state.description}
        />
        <FormError error={errors.description} />
      </Form.Field>
      <Form.Field error={errors.date !== undefined}>
        <label>Päivämäärä</label>
        <Input
          icon="calendar"
          name="date"
          onChange={onChange}
          placeholder="pp-kk-vvvv"
          readOnly={readOnly}
          type="date"
          value={state.date}
        />
        <FormError error={errors.date} />
      </Form.Field>
      <Form.Field error={errors.hours !== undefined}>
        <label>Työtunnit</label>
        <Input
          label={{ basic : true, content : "tuntia" }}
          labelPosition="right"
          name="hours"
          onChange={onChange}
          placeholder="Pyöristyy lähimpään kokonaislukuun"
          readOnly={readOnly}
          value={state.hours}
        />
        <FormError error={errors.hours} />
      </Form.Field>
      <Form.Field className="padded">
        <Form.Checkbox
          checked={state.contractScope}
          label="Urakan puitteissa"
          name="contractScope"
          onChange={onChange}
          readOnly={readOnly}
        />
      </Form.Field>
    </div>
  )
}

ActivityForm.propTypes = {
  activity : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  owner : PropTypes.string.isRequired,
  readOnly : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default ActivityForm
