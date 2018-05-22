import ClientForm from "../../component/forms/client_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { clientState } from "../../util/form_state"
import { connect } from "react-redux"
import { createClient, updateClient } from "../../action/client"
import { withRouter } from "react-router-dom"

class ClientFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = clientState(props.client)
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()

    let { history, id, isNew, token } = this.props
    this.props.save(this.state, history, id, isNew, token)
  }

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <ClientForm
        errors={this.props.errors}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        state={this.state}
      />
      <Divider hidden />
      {( this.props.readOnly )
        ? null
        : <Button content="Tallenna" fluid />
      }
    </Form>
}

const mapStateToProps = (state) => (
  {
    errors : state.clients.write.errors,
    pending : state.clients.write.pending,
    readOnly : ( !state.auth.admin ),
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, token) => {
      ( isNew )
        ? dispatch(createClient(data, token, history))
        : dispatch(updateClient(id, data, token))
    }
  }
)

ClientFormContainer.propTypes = {
  client : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  pending : PropTypes.bool.isRequired,
  readOnly : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientFormContainer))
