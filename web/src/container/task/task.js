import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import Error from "../../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import TaskActivitiesContainer from "./task_activities"
import TaskDetailsContainer from "./task_details"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchProjectsIfNeeded } from "../../action/project"
import { parseUrlQuery } from "../../util/parser"
import { resetWriteTask, updateTask } from "../../action/task"

class TaskContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, project, task } = this.props

    if ( !isNew && !task ) return <Error />
    if ( isNew && !project ) return <Error
      message="Virheellinen työmaan tunniste, älä sooloile osoitepalkin kanssa!"
    />

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <TaskDetailsContainer
            id={id}
            isNew={isNew}
            project={project || {}}
            task={task || { project }}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Suoritteet">
              <TaskActivitiesContainer
                id={id}
                task={task}
              />
            </Accordion>
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={task.attachments || []}
                entity="Task"
                id={id}
                thunk={updateTask}
              />
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { id } = props.match.params
  let projectId = parseUrlQuery(props.location.search).id

  return {
    id,
    isNew : ( id === "new" ),
    project : state.projects.data.items
      .find(p => p.id === projectId),
    task : state.tasks.data.items
      .find(t => t.id === id),
    token : state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchActivitiesIfNeeded(token))
      dispatch(fetchMaterialsIfNeeded(token))
      dispatch(fetchProjectsIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteTask())
    }
  }
)

TaskContainer.propTypes = {
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  location : PropTypes.object.isRequired,
  match : PropTypes.object.isRequired,
  project : PropTypes.object,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  task : PropTypes.object,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer)
