import React from "react"
import { Button, Dropdown, Form, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) => (
  <List.Item
    as={Link}
    key={e.id}
    to={`/employees/${e.id}`}
  >
    <List.Content>
      <List.Header
        content={`${e.lastName}, ${e.firstName}`}
      />
      <List.Description
        content={( e.administrator )
          ? "Työnjohtaja"
          : "Työntekijä"
        }
      />
    </List.Content>
  </List.Item>
)

const ProjectEmployees = (props) => {
  let { onChange, onSubmit, readOnly, selected } = props

  return (
    <div>
      <List divided relaxed>
        {props.assigned.map(e => asRow(e))}
      </List>
      {( readOnly )
        ? null
        : <Form
          className="padded"
          onSubmit={onSubmit}
        >
          <Form.Field>
            <label>Osoita työntekijä työmaalle</label>
            <Dropdown
              onChange={onChange}
              options={props.unassigned}
              placeholder="Valitse työntekijä"
              search={true}
              selection
              value={selected}
            />
          </Form.Field>
          <Button content="Osoita" fluid />
        </Form>
      }
    </div>
  )
}

export default ProjectEmployees
