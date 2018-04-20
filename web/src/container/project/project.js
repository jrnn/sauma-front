import ProjectDetailsContainer from "./project_details"
import ProjectListContaner from "./project_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"

class ProjectContainer extends React.Component {
  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <div>
        <h2 className="padded">Työmaat</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={ProjectDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={ProjectListContaner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.projects.data.error,
    pending : state.projects.data.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  null
)(ProjectContainer))
