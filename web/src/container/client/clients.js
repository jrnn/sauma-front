import ClientListContainer from "./client_list"
import LinkButton from "../../component/widgets/link_button"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class ClientsContainer extends React.Component {
  render = () =>
    <div>
      <ClientListContainer
        clients={this.props.clients}
      />
      <LinkButton
        active={this.props.admin}
        href="/clients/new"
        label="Lisää uusi"
      />
    </div>
}

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    clients : state.clients.data.items
  }
)

ClientsContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  clients : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(ClientsContainer)
