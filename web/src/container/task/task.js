import Accordion from "../../component/widgets/accordion"
import React from "react"
import TaskActivitiesContainer from "./task_activities"
import TaskDetailsContainer from "./task_details"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchProjectsIfNeeded } from "../../action/project"
import { parseUrlQuery } from "../../util/parser"
import { resetWriteTask } from "../../action/task"

class TaskContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, project, task } = this.props

    if ( !isNew && !task ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    if ( isNew && !project ) return (
      <h1 align="center">
        Työmaan ID joko virheellinen tai puuttuu! Älä sooloile osoitepalkin kanssa!
      </h1>
    )

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
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer)
