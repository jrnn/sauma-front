import AddressForm from "../../component/address_form"
import ClientForm from "../../component/client_form"
import React from "react"
import { addressState, clientState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteClient } from "../../action/client"
import { withRouter } from "react-router-dom"

const initState = (c) => {
  let state = clientState(c)
  state.address = addressState(c.address || {})

  return state
}

class ClientFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.client)
  }

  componentWillUnmount = () =>
    this.props.resetWriteClient()

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value
    this.setState({ ...this.state, address })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { auth, errors, pending } = this.props

    let buttons = ( !auth.admin )
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
          readOnly={!auth.admin}
          state={this.state}
        />
        <Divider hidden />
        <AddressForm
          errors={errors}
          onChange={this.handleAddressChange}
          readOnly={!auth.admin}
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
    errors : state.clients.write.errors,
    pending : state.clients.write.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { resetWriteClient }
)(ClientFormContainer))
