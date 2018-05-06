import React from "react"
import { Button, Dropdown, Form, Input, Label, List } from "semantic-ui-react"

const asRow = (m, qty, onChange, onDelete) =>
  <List.Item key={m.id}>
    <List.Content floated="right">
      <Input
        labelPosition="right"
        name={m.id}
        onChange={onChange}
        type="number"
        value={qty}
      >
        <input />
        <Label
          basic
          content={m.unit}
        />
        <Button
          basic
          icon="delete"
          name={m.id}
          onClick={onDelete}
        />
      </Input>
    </List.Content>
    <List.Content>
      <List.Header content={m.name} />
      <List.Description content={m.color || "--"} />
    </List.Content>
  </List.Item>

const QuotaForm = (props) => {
  let { dropdownChange, onChange, onDelete, options, state } = props

  return (
    <div>
      <Form.Field>
        <label>Materiaaliarvio</label>
        <List divided verticalAlign="middle">
          {state.quotas
            .map(q => asRow(q.material, q.quantity, onChange, onDelete))
          }
        </List>
      </Form.Field>
      <Form.Field>
        <Dropdown
          name="material"
          onChange={dropdownChange}
          options={options}
          placeholder="Lisää uusi materiaali"
          search={true}
          selection
          value=""
        />
      </Form.Field>
    </div>
  )
}

export default QuotaForm
