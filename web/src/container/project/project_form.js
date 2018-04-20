import AddressForm from "../../component/address_form"
import ProjectForm from "../../component/project_form"
import React from "react"
import { addressState, projectState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteProject } from "../../action/project"
import { withRouter } from "react-router-dom"

const initState = (p) => {
  let state = projectState(p)
  state.address = addressState(p.address || {})

  return state
}

class ProjectFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.project)
  }

  componentWillUnmount = () =>
    this.props.resetWriteProject()

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

    let buttons = ( !auth.admin )
      ? null
      : <Button content="Tallenna" fluid />

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <ProjectForm
          clients={this.props.clients}
          errors={errors}
          isNew={this.props.isNew}
          managers={this.props.managers}
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
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.projects.write.errors,
    pending : state.projects.write.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { resetWriteProject }
)(ProjectFormContainer))
