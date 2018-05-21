import AddressForm from "../../component/forms/address_form"
import ProjectForm from "../../component/forms/project_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { projectState } from "../../util/form_state"

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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { errors, readOnly } = this.props

    return (
      <Form
        loading={this.props.pending}
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
        <Divider />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider />
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

ProjectFormContainer.propTypes = {
  clients : PropTypes.arrayOf(PropTypes.object).isRequired,
  errors : PropTypes.object.isRequired,
  isNew : PropTypes.bool.isRequired,
  managers : PropTypes.arrayOf(PropTypes.object).isRequired,
  pending : PropTypes.bool.isRequired,
  project : PropTypes.object.isRequired,
  readOnly : PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  null
)(ProjectFormContainer)
