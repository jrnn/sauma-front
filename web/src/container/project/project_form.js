import AddressFormContainer from "../address_form"
import ProjectForm from "../../component/forms/project_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { clientOptions, managerOptions } from "../../util/form_options"
import { connect } from "react-redux"
import { createProject, updateProject } from "../../action/project"
import { projectState } from "../../util/form_state"
import { withRouter } from "react-router-dom"

class ProjectFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = projectState(props.project)
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()

    let { history, id, isNew, token } = this.props
    this.props.save(this.state, history, id, isNew, token)
  }

  syncAddressState = (address) =>
    this.setState({ ...this.state, address })

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <ProjectForm
        clients={this.props.clients}
        errors={this.props.errors}
        isNew={this.props.isNew}
        managers={this.props.managers}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        state={this.state}
      />
      <Divider hidden />
      <AddressFormContainer
        address={this.state.address}
        errors={this.props.errors}
        readOnly={this.props.readOnly}
        sync={this.syncAddressState}
      />
      <Divider hidden />
      {( this.props.readOnly )
        ? null
        : <Button content="Tallenna" fluid />
      }
    </Form>
}

const mapStateToProps = (state, props) => (
  {
    clients : clientOptions(state.clients.data.items, props.project),
    errors : state.projects.write.errors,
    managers : managerOptions(state.employees.data.items),
    pending : state.projects.write.pending,
    readOnly : ( !state.auth.admin ),
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, token) => {
      ( isNew )
        ? dispatch(createProject(data, token, history))
        : dispatch(updateProject(id, data, token))
    }
  }
)

ProjectFormContainer.propTypes = {
  clients : PropTypes.arrayOf(PropTypes.object).isRequired,
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  managers : PropTypes.arrayOf(PropTypes.object).isRequired,
  pending : PropTypes.bool.isRequired,
  project : PropTypes.object.isRequired,
  readOnly : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectFormContainer))
