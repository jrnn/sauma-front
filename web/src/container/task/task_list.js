import PropTypes from "prop-types"
import React from "react"
import TaskList from "../../component/lists/task_list"
import { connect } from "react-redux"

class TaskListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterTasks = () => {
    let { filter } = this.state

    return this.props.tasks
      .filter(t =>
        t.project.projectId.toLowerCase().includes(filter) ||
        t.name.toLowerCase().includes(filter))
      .sort((t1, t2) => {
        let a = `${t1.project.projectId}_${t1.name}`
        let b = `${t2.project.projectId}_${t2.name}`

        return a.localeCompare(b)
      })
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <TaskList
      filter={this.state.filter}
      onChange={this.handleFilter}
      tasks={this.filterTasks()}
    />
}

const mapStateToProps = (state) =>
  ({ tasks : state.tasks.data.items })

TaskListContainer.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(TaskListContainer)
