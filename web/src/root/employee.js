import EmployeeContainer from "../container/employee/employee"
import EmployeeListContainer from "../container/employee/employee_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchEmployeesIfNeeded } from "../action/employee"
import { Route } from "react-router-dom"

class EmployeeRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

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
          component={EmployeeContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={EmployeeListContainer}
          exact path={match.path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.employees.data.error,
    pending : state.employees.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchEmployeesIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeRoot)
