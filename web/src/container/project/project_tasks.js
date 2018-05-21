import ProjectTasks from "../../component/lists/project_tasks"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class ProjectTasksContainer extends React.Component {
  render = () => {
    return (
      <ProjectTasks
        admin={this.props.admin}
        id={this.props.id}
        tasks={this.props.tasks}
      />
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    admin : state.auth.admin,
    tasks : state.tasks.data.items
      .filter(t => t.project.id === props.id)
  }
)

ProjectTasksContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  id : PropTypes.string.isRequired,
  tasks : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(
  mapStateToProps,
  null
)(ProjectTasksContainer)
