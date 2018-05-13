import Accordion from "../../component/accordion"
import ClientFormContainer from "./client_form"
import React from "react"
import { connect } from "react-redux"
import { createClient, updateClient } from "../../action/client"
import { withRouter } from "react-router-dom"

class ClientDetailsContainer extends React.Component {
  save = (client) => {
    let { id } = this.props.match.params
    let { auth, createClient, history, isNew, updateClient } = this.props

    if ( isNew )
      createClient(client, auth.token, history)
    else
      updateClient(id, client, auth.token)
  }

  render = () => {
    let { client, isNew } = this.props

    if ( !isNew && !client ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ClientFormContainer
            client={client || {}}
            onSubmit={this.save}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Asiakkaan työmaat">
              <p>TULOSSA PIAN</p>
            </Accordion>
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    client : state.clients.data.items
      .find(c => c.id === props.match.params.id),
    isNew : ( props.match.params.id === "new" )
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createClient, updateClient }
)(ClientDetailsContainer))
