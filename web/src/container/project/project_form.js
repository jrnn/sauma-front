import AddressForm from "../../component/address_form"
import ProjectForm from "../../component/project_form"
import React from "react"
import { projectState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteProject } from "../../action/project"

class ProjectFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = projectState(props.project)
  }

  componentWillUnmount = () =>
    this.props.resetWriteProject()

  dropdownClients = () => {
    let { clients, project } = this.props

    return ( project && project.client )
      ? [
        {
          key : project.client.id,
          text : project.client.legalEntity,
          value : project.client.id
        }
      ]
      : clients.map(c => (
        {
          key : c.id,
          text : c.legalEntity,
          value : c.id
        }
      )).sort((c1, c2) =>
        c1.text.localeCompare(c2.text))
  }

  dropdownManagers = () =>
    this.props.employees
      .filter(e => e.administrator)
      .map(e => ({
        key : e.id,
        text : e.lastName,
        value : e.id
      }))
      .sort((e1, e2) =>
        e1.text.localeCompare(e2.text))

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value
    this.setState({ ...this.state, address })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { auth, errors, pending } = this.props

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <ProjectForm
          clients={this.dropdownClients()}
          errors={errors}
          isNew={this.props.isNew}
          managers={this.dropdownManagers()}
          onChange={this.handleChange}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        {( !auth.admin )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    clients : state.clients.data.items,
    employees : state.employees.data.items,
    errors : state.projects.write.errors,
    pending : state.projects.write.pending
  }
)

export default connect(
  mapStateToProps,
  { resetWriteProject }
)(ProjectFormContainer)
