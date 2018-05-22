import LinkButton from "../../component/widgets/link_button"
import PropTypes from "prop-types"
import React from "react"
import TaskListContainer from "../task/task_list"
import { connect } from "react-redux"

class ProjectTasksContainer extends React.Component {
  render = () =>
    <div>
      <TaskListContainer
        tasks={this.props.tasks}
      />
      <LinkButton
        active={this.props.admin}
        href={`/tasks/new?id=${this.props.id}`}
        label="Lisää uusi"
      />
    </div>
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
