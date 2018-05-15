import Accordion from "../../component/accordion"
import ActivityDetailsContainer from "./activity_details"
import React from "react"
import { connect } from "react-redux"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchTasksIfNeeded } from "../../action/task"
import { parseUrlQuery } from "../../util/parser"
import { resetWriteActivity } from "../../action/activity"

class ActivityContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { activity, id, isNew, task } = this.props

    if ( !isNew && !activity ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    if ( isNew && !task ) return (
      <h1 align="center">
        Tehtävän ID joko virheellinen tai puuttuu! Älä sooloile osoitepalkin kanssa!
      </h1>
    )

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
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityContainer)
