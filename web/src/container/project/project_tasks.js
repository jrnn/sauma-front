import ProjectTasks from "../../component/project_tasks"
import React from "react"
import { connect } from "react-redux"

class ProjectTasksContainer extends React.Component {
  render = () => {
    let { auth, id, tasks } = this.props

    return (
      <ProjectTasks
        admin={auth.admin}
        id={id}
        tasks={tasks}
      />
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    tasks : state.tasks.data.items
      .filter(t => t.project.id === props.id)
  }
)

export default connect(
  mapStateToProps,
  null
)(ProjectTasksContainer)
