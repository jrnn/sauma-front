import PropTypes from "prop-types"
import React from "react"
import TaskActivities from "../../component/lists/task_activities"
import { connect } from "react-redux"

class TaskActivitiesContainer extends React.Component {
  render = () =>
    <TaskActivities
      activities={this.props.activities}
      readOnly={this.props.readOnly}
      task={this.props.task}
    />
}

const mapStateToProps = (state, props) => {
  let { employees } = props.task.project || []

  return {
    activities : state.activities.data.items
      .filter(a => a.task.id === props.id),
    readOnly : ( !employees.includes(state.auth.id) )
  }
}

TaskActivitiesContainer.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly : PropTypes.bool.isRequired,
  task : PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  null
)(TaskActivitiesContainer)
