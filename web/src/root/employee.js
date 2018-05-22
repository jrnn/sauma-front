import EmployeeContainer from "../container/employee/employee"
import EmployeesContainer from "../container/employee/employees"
import Error from "../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import { connect } from "react-redux"
import { fetchEmployeesIfNeeded } from "../action/employee"
import { Route } from "react-router-dom"

class EmployeeRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return <Spinner />
    if ( error ) return <Error message={error} />

    return (
      <div>
        <h2 className="padded">Henkilöstö</h2>
        <Route
          component={EmployeeContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={EmployeesContainer}
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

EmployeeRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeRoot)
