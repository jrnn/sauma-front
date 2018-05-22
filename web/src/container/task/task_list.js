import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"
import TaskList from "../../component/lists/task_list"

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
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <TaskList
        tasks={this.filterTasks()}
      />
    </div>
}

TaskListContainer.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object)
}

export default TaskListContainer
