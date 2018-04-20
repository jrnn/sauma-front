import EmployeeDetailsContainer from "./employee_details"
import EmployeeListContaner from "./employee_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"

class EmployeeContainer extends React.Component {
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
        <h2 className="padded">Henkilöstö</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={EmployeeDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={EmployeeListContaner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.employees.data.error,
    pending : state.employees.data.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  null
)(EmployeeContainer))
