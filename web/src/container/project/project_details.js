import Accordion from "../../component/accordion"
import EmbeddedMap from "../../component/embedded_map"
import ProjectEmployees from "../../component/project_employees"
import ProjectFormContainer from "./project_form"
import ProjectTasks from "../../component/project_tasks"
import React from "react"
import {
  assignEmployeeToProject,
  createProject,
  updateProject
} from "../../action/project"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class ProjectDetailsContainer extends React.Component {
  assign = (employee) => {
    let { id } = this.props.match.params
    let { assignEmployeeToProject, auth } = this.props

    assignEmployeeToProject(id, employee, auth.token)
  }

  save = (project) => {
    let { id } = this.props.match.params
    let { auth, createProject, history, isNew, updateProject } = this.props

    if ( isNew )
      createProject(project, auth.token, history)
    else
      updateProject(id, project, auth.token)
  }

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

  dropdownEmployees = () => {
    let { employees, project } = this.props
    let assignedIds = project.employees.map(e => e.id)

    return employees
      .filter(e => !assignedIds.includes(e.id))
      .map(e => ({
        key : e.id,
        text : `${e.lastName}, ${e.firstName}`,
        value : e.id
      }))
      .sort((e1, e2) =>
        e1.text.localeCompare(e2.text))
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

  render = () => {
    let { auth, isNew, project, tasks } = this.props

    if ( !isNew && !project ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ProjectFormContainer
            clients={this.dropdownClients()}
            isNew={isNew}
            managers={this.dropdownManagers()}
            onSubmit={this.save}
            project={project || {}}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Työntekijät">
              <ProjectEmployees
                assigned={project.employees}
                onSubmit={this.assign}
                readOnly={( !auth.admin )}
                unassigned={this.dropdownEmployees()}
              />
            </Accordion>
            <Accordion title="Tehtävät">
              <ProjectTasks
                admin={auth.admin}
                projectId={project.id}
                tasks={tasks}
              />
            </Accordion>
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
            </Accordion>
            <EmbeddedMap
              address={project.address}
              id={project.id}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { id } = props.match.params

  return {
    auth : state.auth,
    clients : state.clients.data.items,
    employees : state.employees.data.items,
    isNew : ( id === "new" ),
    project : state.projects.data.items
      .find(p => p.id === id),
    tasks : state.tasks.data.items
      .filter(t => t.project.id === id)
  }
}

export default withRouter(connect(
  mapStateToProps,
  { assignEmployeeToProject, createProject, updateProject }
)(ProjectDetailsContainer))
