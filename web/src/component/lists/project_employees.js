import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Dropdown, Form, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) =>
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

const ProjectEmployees = (props) =>
  <div>
    <List divided relaxed>
      {( props.assigned.length > 0 )
        ? props.assigned.map(asRow)
        : <EmptyList />
      }
    </List>
    {( props.readOnly )
      ? null
      : <div>
        <Divider />
        <Form onSubmit={props.onSubmit}>
          <Form.Field>
            <label>Osoita työntekijä työmaalle</label>
            <Dropdown
              onChange={props.onChange}
              options={props.unassigned}
              placeholder="Valitse työntekijä"
              search={true}
              selection
              value={props.selected}
            />
          </Form.Field>
          <Button content="Osoita" fluid />
        </Form>
      </div>
    }
  </div>

ProjectEmployees.propTypes = {
  assigned : PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  readOnly : PropTypes.bool.isRequired,
  selected : PropTypes.string,
  unassigned : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectEmployees
