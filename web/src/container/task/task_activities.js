import React from "react"
import TaskActivities from "../../component/task_activities"
import { connect } from "react-redux"

class TaskActivitiesContainer extends React.Component {
  render = () => {
    let { auth, activities, task } = this.props
    let readOnly = ( !task.project.employees.includes(auth.id) )

    return (
      <TaskActivities
        activities={activities}
        readOnly={readOnly}
        task={task}
      />
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    activities : state.activities.data.items
      .filter(a => a.task.id === props.id),
    auth : state.auth
  }
)

export default connect(
  mapStateToProps,
  null
)(TaskActivitiesContainer)
