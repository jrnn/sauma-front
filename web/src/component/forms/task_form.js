import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Form, Input, TextArea } from "semantic-ui-react"

const TaskForm = (props) => {
  let { errors, onChange, project, readOnly, state } = props

  return (
    <div>
      <Form.Field>
        <label>Työmaan työnumero</label>
        <Input
          disabled
          value={project.projectId || ""}
        />
      </Form.Field>
      <Form.Field error={errors.name !== undefined}>
        <label>Otsikko</label>
        <Input
          name="name"
          onChange={onChange}
          placeholder="Näkyy tehtäviä listattaessa"
          readOnly={readOnly}
          value={state.name}
        />
        <FormError error={errors.name} />
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
          placeholder="Pyöristyy lähimpään kokonaislukuun"
          readOnly={readOnly}
          value={state.daysNeeded}
        />
        <FormError error={errors.daysNeeded} />
      </Form.Field>
    </div>
  )
}

TaskForm.propTypes = {
  errors : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  project : PropTypes.object.isRequired,
  readOnly : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired
}

export default TaskForm
