import ProjectFormContainer from "./project_form"
import PropTypes from "prop-types"
import React from "react"
import { clientOptions, managerOptions } from "../../util/form_options"
import { connect } from "react-redux"
import { createProject, updateProject } from "../../action/project"
import { withRouter } from "react-router-dom"

class ProjectDetailsContainer extends React.Component {
  save = (project) => {
    let { history, id, isNew, token } = this.props

    return ( isNew )
      ? this.props.createProject(project, token, history)
      : this.props.updateProject(id, project, token)
  }

  render = () => {
    let { clients, employees, isNew, project } = this.props

    return (
      <ProjectFormContainer
        clients={clientOptions(clients, project)}
        isNew={isNew}
        onSubmit={this.save}
        managers={managerOptions(employees)}
        project={project}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    clients : state.clients.data.items,
    employees : state.employees.data.items,
    token : state.auth.token
  }
)

ProjectDetailsContainer.propTypes = {
  clients : PropTypes.arrayOf(PropTypes.object).isRequired,
  createProject : PropTypes.func.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object).isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  project : PropTypes.object.isRequired,
  token : PropTypes.string.isRequired,
  updateProject : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createProject, updateProject }
)(ProjectDetailsContainer))
