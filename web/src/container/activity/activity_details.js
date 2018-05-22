import ActivityFormContainer from "./activity_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import {
  createActivity,
  signOffActivity,
  updateActivity
} from "../../action/activity"
import { parseNumber, parseQuotas } from "../../util/parser"
import { withRouter } from "react-router-dom"

class ActivityDetailsContainer extends React.Component {
  save = (activity) => {
    let { history, id, isNew, task, token } = this.props
    let payload = {
      ...activity,
      hours : parseNumber(activity.hours),
      quotas : parseQuotas(activity.quotas)
    }

    if ( isNew ) {
      payload.task = task.id
      this.props.createActivity(payload, token, history)
    } else
      this.props.updateActivity(id, payload, token)
  }

  sign = () => {
    let { id, token } = this.props
    this.props.signOffActivity(id, token)
  }

  render = () =>
    <ActivityFormContainer
      activity={this.props.activity}
      isNew={this.props.isNew}
      onSave={this.save}
      onSign={this.sign}
    />
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

ActivityDetailsContainer.propTypes = {
  activity : PropTypes.object.isRequired,
  createActivity : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  signOffActivity : PropTypes.func.isRequired,
  task : PropTypes.object.isRequired,
  token : PropTypes.string.isRequired,
  updateActivity : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createActivity, signOffActivity, updateActivity }
)(ActivityDetailsContainer))
