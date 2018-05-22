import Accordion from "../../component/widgets/accordion"
import ActivityDetailsContainer from "./activity_details"
import AttachmentContainer from "../attachment/attachment"
import Error from "../../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchTasksIfNeeded } from "../../action/task"
import { parseUrlQuery } from "../../util/parser"
import { resetWriteActivity, updateActivity } from "../../action/activity"

class ActivityContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { activity, id, isNew, task } = this.props

    if ( !isNew && !activity ) return <Error />
    if ( isNew && !task ) return <Error
      message="Virheellinen tehtävän tunniste, älä sooloile osoitepalkin kanssa!"
    />

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ActivityDetailsContainer
            activity={activity || { task }}
            id={id}
            isNew={isNew}
            task={task || {}}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={activity.attachments || []}
                entity="Activity"
                id={id}
                thunk={updateActivity}
              />
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { id } = props.match.params
  let taskId = parseUrlQuery(props.location.search).id

  return {
    activity : state.activities.data.items
      .find(a => a.id === id),
    id,
    isNew : ( id === "new" ),
    task : state.tasks.data.items
      .find(t => t.id === taskId),
    token : state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchMaterialsIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteActivity())
    }
  }
)

ActivityContainer.propTypes = {
  activity : PropTypes.object,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  location : PropTypes.object.isRequired,
  match : PropTypes.object.isRequired,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  task : PropTypes.object,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityContainer)
