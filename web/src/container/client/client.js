import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import ClientDetailsContainer from "./client_details"
import React from "react"
import { connect } from "react-redux"
import { resetWriteClient, updateClient } from "../../action/client"

class ClientContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { client, id, isNew } = this.props

    if ( !isNew && !client ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <ClientDetailsContainer
            client={client || {}}
            id={id}
            isNew={isNew}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Asiakkaan työmaat">
              <p>TULOSSA PIAN</p>
            </Accordion>
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={client.attachments || []}
                entity="Client"
                id={id}
                thunk={updateClient}
              />
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

const mapStateToProps = (state, props) => {
  let { id } = props.match.params

  return {
    client : state.clients.data.items
      .find(c => c.id === id),
    id,
    isNew : ( id === "new" )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    reset : () => {
      dispatch(resetWriteClient())
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientContainer)
