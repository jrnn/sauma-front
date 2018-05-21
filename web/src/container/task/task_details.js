import PropTypes from "prop-types"
import React from "react"
import TaskFormContainer from "./task_form"
import { connect } from "react-redux"
import { createTask, updateTask } from "../../action/task"
import { parseNumber, parseQuotas } from "../../util/parser"
import { withRouter } from "react-router-dom"

class TaskDetailsContainer extends React.Component {
  save = (task) => {
    let { history, id, isNew, project, token } = this.props
    let payload = {
      ...task,
      daysNeeded : parseNumber(task.daysNeeded),
      quotas : parseQuotas(task.quotas)
    }

    if ( isNew ) {
      payload.project = project.id
      this.props.createTask(payload, token, history)
    } else
      this.props.updateTask(id, payload, token)
  }

  render = () =>
    <TaskFormContainer
      onSubmit={this.save}
      task={this.props.task}
    />
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

TaskDetailsContainer.propTypes = {
  createTask : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  project : PropTypes.object.isRequired,
  task : PropTypes.object.isRequired,
  token : PropTypes.string.isRequired,
  updateTask : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createTask, updateTask }
)(TaskDetailsContainer))
