import Accordion from "../../component/widgets/accordion"
import ActivityListContainer from "../activity/activity_list"
import MyFormContainer from "./my_form"
import MyPasswordContainer from "./my_password"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { resetWriteEmployee } from "../../action/employee"

class MyContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () =>
    <div>
      <Accordion title="Perustiedot">
        <MyFormContainer
          employee={this.props.employee || {}}
        />
      </Accordion>
      <Accordion title="Suoritteet">
        <ActivityListContainer
          activities={this.props.activities}
        />
      </Accordion>
      <Accordion title="Salasanan vaihto">
        <MyPasswordContainer />
      </Accordion>
    </div>
}

const mapStateToProps = (state) => {
  let { id, token } = state.auth

  return {
    activities : state.activities.data.items
      .filter(a => a.owner.id === id),
    employee : state.employees.data.items
      .find(e => e.id === id),
    token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchActivitiesIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteEmployee())
    }
  }
)

MyContainer.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object).isRequired,
  employee : PropTypes.object,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyContainer)
