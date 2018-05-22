import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { filterProjects } from "../../component/lists/list_filters"
import { projectRow } from "../../component/lists/list_rows"

const ProjectsContainer = ({ admin, projects }) =>
  <div>
    <ListContainer
      entities={projects}
      filter={filterProjects}
      toRow={projectRow}
    />
    <LinkButton
      active={admin}
      href="/projects/new"
      label="Lisää uusi työmaa"
    />
  </div>

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    projects : state.projects.data.items
  }
)

ProjectsContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(ProjectsContainer)
