import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import EmbeddedMap from "../../component/widgets/embedded_map"
import Error from "../../component/alerts/error"
import ProjectEmployeesContainer from "./project_employees"
import ProjectFormContainer from "./project_form"
import ProjectTasksContainer from "./project_tasks"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../../action/client"
import { fetchEmployeesIfNeeded } from "../../action/employee"
import { fetchTasksIfNeeded } from "../../action/task"
import { resetWriteProject, updateProject } from "../../action/project"

class ProjectContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, project } = this.props
    if ( !isNew && !project ) return <Error />

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ProjectFormContainer
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
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={project.attachments || []}
                entity="Project"
                id={id}
                thunk={updateProject}
              />
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

ProjectContainer.propTypes = {
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  match : PropTypes.object.isRequired,
  project : PropTypes.object,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
