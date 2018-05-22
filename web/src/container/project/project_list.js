import ProjectList from "../../component/lists/project_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"

class ProjectListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterProjects = () => {
    let { filter } = this.state

    return this.props.projects
      .filter(p =>
        p.name.toLowerCase().includes(filter) ||
        p.projectId.toLowerCase().includes(filter) ||
        p.client.legalEntity.toLowerCase().includes(filter))
      .sort((p1, p2) =>
        p1.projectId.localeCompare(p2.projectId))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <ProjectList
        projects={this.filterProjects()}
      />
    </div>
}

ProjectListContainer.propTypes = {
  projects : PropTypes.arrayOf(PropTypes.object)
}

export default ProjectListContainer
