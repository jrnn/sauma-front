import AddressForm from "../../component/address_form"
import ProjectForm from "../../component/project_form"
import React from "react"
import { projectState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"

class ProjectFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = projectState(props.project)
  }

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
    let { errors, pending, readOnly } = this.props

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
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        {( readOnly )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.projects.write.errors,
    pending : state.projects.write.pending,
    readOnly : ( !state.auth.admin )
  }
)

export default connect(
  mapStateToProps,
  null
)(ProjectFormContainer)
