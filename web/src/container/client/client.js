import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import ClientFormContainer from "./client_form"
import CommentContainer from "../comment"
import Error from "../../component/alerts/error"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchProjectsIfNeeded } from "../../action/project"
import { filterProjectsForClient } from "../../component/lists/list_filters"
import { projectRowForClient } from "../../component/lists/list_rows"
import {
  fetchClients,
  resetWriteClient,
  updateClient
} from "../../action/client"

class ClientContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { client, id, isNew } = this.props
    if ( !isNew && !client ) return <Error />

    return (
      <div>
        <Accordion
          active={isNew}
          title="Perustiedot"
        >
          <ClientFormContainer
            client={client || {}}
            id={id}
            isNew={isNew}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion
              active={( this.props.projects.length > 0 )}
              title="Asiakkaan työmaat"
            >
              <ListContainer
                entities={this.props.projects}
                filter={filterProjectsForClient}
                toRow={projectRowForClient}
              />
            </Accordion>
            <Accordion
              active={( client.attachments.length > 0 )}
              title="Liitteet"
            >
              <AttachmentContainer
                attachments={client.attachments || []}
                entity="Client"
                id={id}
                thunk={updateClient}
              />
            </Accordion>
            <Accordion
              active={( client.comments.length > 0 )}
              title="Huomiot"
            >
              <CommentContainer
                comments={client.comments || []}
                entity="Client"
                id={id}
                thunk={fetchClients}
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

  return {
    client : state.clients.data.items
      .find(c => c.id === id),
    id,
    isNew : ( id === "new" ),
    projects : state.projects.data.items
      .filter(p => p.client.id === id),
    token : state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchProjectsIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteClient())
    }
  }
)

ClientContainer.propTypes = {
  client : PropTypes.object,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  match : PropTypes.object.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientContainer)
