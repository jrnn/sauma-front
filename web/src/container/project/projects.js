import LinkButton from "../../component/widgets/link_button"
import ProjectListContainer from "./project_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class ProjectsContainer extends React.Component {
  render = () =>
    <div>
      <ProjectListContainer
        projects={this.props.projects}
      />
      <LinkButton
        active={this.props.admin}
        href="/projects/new"
        label="Lisää uusi"
      />
    </div>
}

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
