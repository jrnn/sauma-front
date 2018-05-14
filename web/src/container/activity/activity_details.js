import Accordion from "../../component/accordion"
import ActivityFormContainer from "./activity_form"
import React from "react"
import { connect } from "react-redux"
import {
  createActivity,
  signOffActivity,
  updateActivity
} from "../../action/activity"
import { parseNumber, parseUrlQuery } from "../../util/parser"

class ActivityDetailsContainer extends React.Component {
  save = (activity) => {
    let { id } = this.props.match.params
    let { auth, history, isNew, task } = this.props

    activity.quotas = activity.quotas
      .filter(q => q.quantity > 0 && parseNumber(q.quantity) !== "NaN")

    let payload = {
      ...activity,
      hours : parseNumber(activity.hours),
      quotas : activity.quotas
        .map(q => ({
          material : q.material.id,
          quantity : parseNumber(q.quantity)
        }))
    }

    if ( isNew ) {
      payload.task = task.id
      this.props.createActivity(payload, auth.token, history)
    } else
      this.props.updateActivity(id, payload, auth.token)
  }

  sign = () => {
    let { id } = this.props.match.params
    let { auth, signOffActivity } = this.props

    signOffActivity(id, auth.token)
  }

  render = () => {
    let { activity, isNew, materials, task } = this.props

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
          <ActivityFormContainer
            activity={activity || { task }}
            isNew={isNew}
            materials={materials}
            onSave={this.save}
            onSign={this.sign}
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

  return {
    activity : state.activities.data.items
      .find(a => a.id === id),
    auth : state.auth,
    isNew : ( id === "new" ),
    materials : state.materials.data.items,
    task : state.tasks.data.items
      .find(t => t.id === parseUrlQuery(props.location.search).id)
  }
}

export default connect(
  mapStateToProps,
  { createActivity, signOffActivity, updateActivity }
)(ActivityDetailsContainer)
