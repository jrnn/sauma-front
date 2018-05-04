import React from "react"
import { Button, Dropdown, Form, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

class ProjectEmployees extends React.Component {
  constructor() {
    super()
    this.state = { id : null }
  }

  asRow = (e) => (
    <List.Item
      key={e.id}
      as={Link}
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

  handleChange = (e, { value }) =>
    this.setState({ id : value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { assigned, readOnly, unassigned } = this.props

    return (
      <div>
        <List divided relaxed>
          {assigned.map(e => this.asRow(e))}
        </List>
        {( readOnly )
          ? null
          : <Form
            className="padded"
            onSubmit={this.handleSubmit}
          >
            <Form.Field>
              <label>Osoita työntekijä työmaalle</label>
              <Dropdown
                onChange={this.handleChange}
                options={unassigned}
                placeholder="Valitse työntekijä"
                search={true}
                selection
                value={this.state.id}
              />
            </Form.Field>
            <Button content="Osoita" fluid />
          </Form>
        }
      </div>
    )
  }
}

export default ProjectEmployees
