import AddressForm from "../component/address_form"
import ClientForm from "../component/client_form"
import React from "react"
import { addressState, clientState } from "../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createClient, updateClient } from "../action/client"
import { withRouter } from "react-router-dom"

const initState = (e) => {
  let state = clientState(e)
  state.address = addressState(e.address || {})

  return state
}

class ClientFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.client)
  }

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value
    this.setState({ ...this.state, address })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    let { auth, createClient, isNew, updateClient } = this.props

    if ( isNew )
      createClient(this.state, auth.token)
    else
      updateClient(this.props.client.id, this.state, auth.token)
  }

  render() {
    let { errors, pending, readOnly } = this.props

    let buttons = ( readOnly )
      ? null
      : <Button content="Tallenna" fluid />

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <ClientForm
          errors={errors}
          onChange={this.handleChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.clients.validation.error,
    pending : state.clients.validation.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createClient, updateClient }
)(ClientFormContainer))
