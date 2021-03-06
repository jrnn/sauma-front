import FormError from "../alerts/form_error"
import PropTypes from "prop-types"
import React from "react"
import { Dropdown, Form, Input } from "semantic-ui-react"

const ProjectForm = (props) => {
  let { errors, onChange, readOnly, state } = props

  return (
    <div>
      <Form.Field error={errors.projectId !== undefined}>
        <label>Työnumero</label>
        <Input
          name="projectId"
          onChange={onChange}
          readOnly={readOnly}
          value={state.projectId}
        />
        <FormError error={errors.projectId} />
      </Form.Field>
      <Form.Field error={errors.name !== undefined}>
        <label>Työmaan nimi / kuvaus</label>
        <Input
          name="name"
          onChange={onChange}
          readOnly={readOnly}
          value={state.name}
        />
        <FormError error={errors.name} />
      </Form.Field>
      <Form.Field error={errors.manager !== undefined}>
        <label>Työnjohtaja / vastuuhenkilö</label>
        <Dropdown
          disabled={readOnly}
          name="manager"
          onChange={onChange}
          options={props.managers}
          placeholder="Valitse työnjohtaja"
          search={true}
          selection
          value={state.manager}
        />
        <FormError error={errors.manager} />
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
      <Form.Field error={errors.client !== undefined}>
        <label>Asiakas</label>
        <Dropdown
          disabled={!props.isNew || readOnly}
          name="client"
          onChange={onChange}
          options={props.clients}
          placeholder="Valitse asiakas"
          readOnly={readOnly}
          search={true}
          selection
          value={state.client}
        />
        <FormError error={errors.client} />
      </Form.Field>
      <Form.Field error={errors.contactPerson !== undefined}>
        <label>Asiakkaan yhteyshenkilö</label>
        <Input
          name="contactPerson"
          onChange={onChange}
          placeholder="Saumausta hoitava mestari"
          readOnly={readOnly}
          value={state.contactPerson}
        />
        <FormError error={errors.contactPerson} />
      </Form.Field>
      <Form.Field error={errors.phone !== undefined}>
        <label>Yhteyshenkilön puhelin</label>
        <Input
          name="phone"
          onChange={onChange}
          placeholder="040-123-4567"
          readOnly={readOnly}
          value={state.phone}
        />
        <FormError error={errors.phone} />
      </Form.Field>
    </div>
  )
}

ProjectForm.propTypes = {
  clients : PropTypes.arrayOf(PropTypes.object).isRequired,
  errors : PropTypes.object.isRequired,
  isNew : PropTypes.bool.isRequired,
  managers : PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange : PropTypes.func.isRequired,
  readOnly : PropTypes.bool.isRequired,
  state : PropTypes.object.isRequired,
}

export default ProjectForm
