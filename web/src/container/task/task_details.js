import Accordion from "../../component/accordion"
import React from "react"
import TaskActivities from "../../component/task_activities"
import TaskFormContainer from "./task_form"
import { connect } from "react-redux"
import { createTask, updateTask } from "../../action/task"
import { parseUrlQuery } from "../../util/parser"
import { withRouter } from "react-router-dom"

class TaskDetailsContainer extends React.Component {
  save = (task) => {
    let { id } = this.props.match.params
    let { auth, history, isNew, project } = this.props

    let payload = {
      ...task,
      quotas : task.quotas
        .filter(q => q.quantity !== "" && q.quantity > 0)
        .map(q => ({ ...q, material : q.material.id }))
    }

    if ( isNew ) {
      payload.project = project.id
      this.props.createTask(payload, auth.token, history)
    } else
      this.props.updateTask(id, payload, auth.token)
  }

  render = () => {
    let { activities, auth, isNew, materials, project, task } = this.props

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
          <TaskFormContainer
            isNew={isNew}
            materials={materials}
            onSubmit={this.save}
            task={task || { project }}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Suoritteet">
              <TaskActivities
                activities={activities}
                canAdd={( task.project.employees.includes(auth.id) )}
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

  return {
    activities : state.activities.data.items
      .filter(a => a.task.id === id),
    auth : state.auth,
    isNew : ( id === "new" ),
    materials : state.materials.data.items,
    project : state.projects.data.items
      .find(p => p.id === parseUrlQuery(props.location.search).id),
    task : state.tasks.data.items
      .find(t => t.id === id)
  }
}

export default withRouter(connect(
  mapStateToProps,
  { createTask, updateTask }
)(TaskDetailsContainer))
