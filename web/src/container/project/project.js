import Accordion from "../../component/widgets/accordion"
import EmbeddedMap from "../../component/widgets/embedded_map"
import ProjectDetailsContainer from "./project_details"
import ProjectEmployeesContainer from "./project_employees"
import ProjectTasksContainer from "./project_tasks"
import React from "react"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../../action/client"
import { fetchEmployeesIfNeeded } from "../../action/employee"
import { fetchTasksIfNeeded } from "../../action/task"
import { resetWriteProject } from "../../action/project"

class ProjectContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, project } = this.props

    if ( !isNew && !project ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ProjectDetailsContainer
            id={id}
            isNew={isNew}
            project={project || {}}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Työntekijät">
              <ProjectEmployeesContainer
                id={id}
                project={project || {}}
              />
            </Accordion>
            <Accordion title="Tehtävät">
              <ProjectTasksContainer id={id} />
            </Accordion>
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
            </Accordion>
            <EmbeddedMap
              address={project.address}
              id={id}
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
    id,
    isNew : ( id === "new" ),
    project : state.projects.data.items
      .find(p => p.id === id),
    token : state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchClientsIfNeeded(token))
      dispatch(fetchEmployeesIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteProject())
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
