import EmployeeDetailsContainer from "./employee_details"
import EmployeeListContaner from "./employee_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchEmployeesIfNeeded } from "../../action/employee"
import { Route } from "react-router-dom"

class EmployeeContainer extends React.Component {
  componentDidMount = () =>
    this.props.refreshState(this.props.auth.token)

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

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchEmployeesIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer)
