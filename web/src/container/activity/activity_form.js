import ActivityForm from "../../component/forms/activity_form"
import PropTypes from "prop-types"
import QuotaFormContainer from "../quota_form"
import React from "react"
import { activityState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import {
  createActivity,
  signOffActivity,
  updateActivity
} from "../../action/activity"
import { parseNumber, parseQuotas } from "../../util/parser"
import { withRouter } from "react-router-dom"

class ActivityFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = activityState(props.activity)
  }

  handleChange = (e, data) => {
    let value = ( data.type === "checkbox" )
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSave = (e) => {
    e.preventDefault(e)

    let { auth, history, id, isNew, task } = this.props
    this.props.save(this.state, history, id, isNew, task, auth.token)
  }

  handleSign = (e) => {
    e.preventDefault(e)

    let { auth, id } = this.props
    this.props.sign(id, auth.token)
  }

  syncQuotaState = (quotas) =>
    this.setState({ ...this.state, quotas })

  render = () => {
    let { activity, auth, isNew } = this.props

    let canSign = ( isNew )
      ? false
      : ( auth.admin && !activity.signed )
    let isOwner = ( isNew )
      ? true
      : ( !activity.signed && auth.id === activity.owner.id )

    return (
      <Form loading={this.props.pending}>
        <ActivityForm
          activity={activity}
          errors={this.props.errors}
          onChange={this.handleChange}
          owner={`${auth.firstName} ${auth.lastName}`}
          readOnly={( !isOwner )}
          state={this.state}
        />
        <Divider />
        <QuotaFormContainer
          header="Käytetyt materiaalit"
          quotas={this.state.quotas}
          readOnly={( !isOwner )}
          sync={this.syncQuotaState}
        />
        {( !isOwner )
          ? null
          : <div>
            <Divider hidden />
            <Button
              content="Tallenna"
              fluid
              onClick={this.handleSave}
            />
          </div>
        }
        {( !canSign )
          ? null
          : <div>
            <Divider hidden />
            <Button
              content="Hyväksy"
              fluid
              onClick={this.handleSign}
            />
          </div>
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.activities.write.errors,
    pending : state.activities.write.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, task, token) => {
      let payload = {
        ...data,
        hours : parseNumber(data.hours),
        quotas : parseQuotas(data.quotas),
        task : task.id || null
      }
      return ( isNew )
        ? dispatch(createActivity(payload, token, history))
        : dispatch(updateActivity(id, payload, token))
    },
    sign : (id, token) => {
      dispatch(signOffActivity(id, token))
    }
  }
)

ActivityFormContainer.propTypes = {
  activity : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  pending : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  sign : PropTypes.func.isRequired,
  task : PropTypes.object.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityFormContainer))
