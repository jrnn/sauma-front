import Accordion from "../../component/accordion"
import ProjectFormContainer from "./project_form"
import React from "react"
import { connect } from "react-redux"
import { createProject, updateProject } from "../../action/project"
import { withRouter } from "react-router-dom"

class ProjectDetailsContainer extends React.Component {
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
    let { isNew, project } = this.props

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
              <p>TULOSSA</p>
            </Accordion>
            <Accordion title="Tehtävät">
              <p>TULOSSA</p>
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    clients : state.clients.data.items,
    employees : state.employees.data.items,
    isNew : ( props.match.params.id === "new" ),
    project : state.projects.data.items
      .find(p => p.id === props.match.params.id)
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createProject, updateProject }
)(ProjectDetailsContainer))
