import Accordion from "../../component/accordion"
import React from "react"
import TaskFormContainer from "./task_form"
import { connect } from "react-redux"
import { createTask, updateTask } from "../../action/task"
import { parseUrlQuery } from "../../util/parser"
import { withRouter } from "react-router-dom"

class TaskDetailsContainer extends React.Component {
  save = (task) => {
    let { id } = this.props.match.params
    let { auth, createTask, history, isNew, project, updateTask } = this.props

    if ( isNew ) {
      task.project = project.id
      createTask(task, auth.token, history)
    } else
      updateTask(id, task, auth.token)
  }

  render = () => {
    let { isNew, project, task } = this.props

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
            onSubmit={this.save}
            task={task || { project }}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="<Placeholder>">
              <p>TULOSSA</p>
            </Accordion>
            <Accordion title="<Placeholder>">
              <p>TULOSSA</p>
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
    auth : state.auth,
    isNew : ( id === "new" ),
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
