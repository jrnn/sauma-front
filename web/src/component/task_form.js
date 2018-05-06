import FormError from "./form_error"
import React from "react"
import { Form, Input, TextArea } from "semantic-ui-react"

const TaskForm = (props) => {
  let { errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field>
        <label>Työmaan työnumero</label>
        <Input
          disabled
          value={props.project.projectId || ""}
        />
      </Form.Field>
      <Form.Field error={errors.description !== undefined}>
        <label>Kuvaus</label>
        <TextArea
          autoHeight
          name="description"
          onChange={onChange}
          placeholder="Kirjoita tehtävän kuvaus"
          readOnly={readOnly}
          style={{ minHeight : 100 }}
          value={state.description}
        />
        <FormError error={errors.description} />
      </Form.Field>
      <Form.Field error={errors.startDate !== undefined}>
        <label>Alkaa</label>
        <Input
          icon="calendar"
          name="startDate"
          onChange={onChange}
          placeholder="pp-kk-vvvv"
          readOnly={readOnly}
          type="date"
          value={state.startDate}
        />
        <FormError error={errors.startDate} />
      </Form.Field>
      <Form.Field error={errors.endDate !== undefined}>
        <label>Päättyy</label>
        <Input
          icon="calendar"
          name="endDate"
          onChange={onChange}
          placeholder="pp-kk-vvvv"
          readOnly={readOnly}
          type="date"
          value={state.endDate}
        />
        <FormError error={errors.endDate} />
      </Form.Field>
      <Form.Field error={errors.daysNeeded !== undefined}>
        <label>Työmääräarvio</label>
        <Input
          label={{ basic : true, content : "päivää" }}
          labelPosition="right"
          name="daysNeeded"
          onChange={onChange}
          readOnly={readOnly}
          type="number"
          value={state.daysNeeded}
        />
        <FormError error={errors.daysNeeded} />
      </Form.Field>
    </div>
  )
}

export default TaskForm
