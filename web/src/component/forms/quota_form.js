import React from "react"
import { Button, Dropdown, Form, Input, List } from "semantic-ui-react"

const asRow = (m, quantity, onChange, onDelete, readOnly) =>
  <List.Item key={m.id}>
    <List.Content floated="right">
      <Input
        name={m.id}
        onChange={onChange}
        readOnly={readOnly}
        style={{ width : "60px" }}
        transparent
        value={quantity}
      />
      {( readOnly )
        ? null
        : <Button
          basic
          compact
          icon="delete"
          name={m.id}
          onClick={onDelete}
        />
      }
    </List.Content>
    <List.Content>
      <List.Header content={m.name} />
      <List.Description content={m.unit} />
    </List.Content>
  </List.Item>

const QuotaForm = (props) => {
  let { readOnly } = props

  return (
    <div>
      <Form.Field>
        <label>{props.header || ""}</label>
        <List divided relaxed verticalAlign="middle">
          {props.state.quotas
            .map(q => asRow(
              q.material,
              q.quantity,
              props.onChange,
              props.onDelete,
              readOnly))
          }
        </List>
      </Form.Field>
      {( readOnly )
        ? null
        : <Form.Field>
          <Dropdown
            name="material"
            onChange={props.onAdd}
            options={props.options}
            placeholder="Lisää uusi materiaali"
            search={true}
            selection
            value=""
          />
        </Form.Field>
      }
    </div>
  )
}

export default QuotaForm
