import PropTypes from "prop-types"
import React from "react"
import TaskListContainer from "./task_list"
import { connect } from "react-redux"

class TasksContainer extends React.Component {
  render = () =>
    <TaskListContainer
      tasks={this.props.tasks}
    />
}

const mapStateToProps = (state) =>
  ({ tasks : state.tasks.data.items })

TasksContainer.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(TasksContainer)
