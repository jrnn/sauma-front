import ProjectFormContainer from "./project_form"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
//import { getClients, resetClients } from "../action/client"
//import { getEmployees, resetEmployees } from "../action/employee"
import { getProject, resetProject } from "../action/project"
import { withRouter } from "react-router-dom"

class ProjectDetailsContainer extends React.Component {
  componentDidMount = () => {
    let { id } = this.props.match.params
    let { auth, isNew } = this.props

    if ( !isNew )
      this.props.getProject(id, auth.token)
    if ( isNew && auth.admin )
      this.props.getClients(auth.token)

    this.props.getEmployees(auth.token)
  }

  componentWillUnmount = () => {
    this.props.resetClients()
    this.props.resetEmployees()
    this.props.resetProject()
  }

  dropdownClients = () => {
    let { clients, isNew, project } = this.props

    if ( !isNew && project.client )
      return [
        {
          key : project.client.id,
          text : project.client.legalEntity,
          value : project.client.id
        }
      ]

    return clients
      .map(c => ({
        key : c.id,
        text : c.legalEntity,
        value : c.id
      }))
      .sort((c1, c2) =>
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

  render() {
    let { auth, error, isNew, pending, project } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <ProjectFormContainer
        clients={this.dropdownClients()}
        isNew={isNew}
        managers={this.dropdownManagers()}
        project={project}
        readOnly={!auth.admin}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    clients : state.clients.all.data,
    employees : state.employees.all.data,
    error : state.projects.one.error,
    pending : state.projects.one.pending,
    project : state.projects.one.data
  }
)

export default withRouter(connect(
  mapStateToProps,
  {
//    getClients,
//    getEmployees,
    getProject,
//    resetClients,
//    resetEmployees,
    resetProject
  }
)(ProjectDetailsContainer))
