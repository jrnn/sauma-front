import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import ClientFormContainer from "./client_form"
import Error from "../../component/alerts/error"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchProjectsIfNeeded } from "../../action/project"
import { filterProjectsForClient } from "../../component/lists/list_filters"
import { projectRowForClient } from "../../component/lists/list_rows"
import { resetWriteClient, updateClient } from "../../action/client"

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
        <Accordion active={isNew} title="Perustiedot">
          <ClientFormContainer
            client={client || {}}
            id={id}
            isNew={isNew}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Asiakkaan työmaat">
              <ListContainer
                entities={this.props.projects}
                filter={filterProjectsForClient}
                toRow={projectRowForClient}
              />
            </Accordion>
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={client.attachments || []}
                entity="Client"
                id={id}
                thunk={updateClient}
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
