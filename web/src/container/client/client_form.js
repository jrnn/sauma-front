import AddressForm from "../../component/forms/address_form"
import ClientForm from "../../component/forms/client_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { clientState } from "../../util/form_state"
import { connect } from "react-redux"

class ClientFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = clientState(props.client)
  }

  handleAddressChange = (e, { name, value }) => {
    let { address } = this.state
    address[name] = value

    this.setState({ ...this.state, address })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { errors, pending, readOnly } = this.props

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
        {( readOnly )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.clients.write.errors,
    pending : state.clients.write.pending,
    readOnly : ( !state.auth.admin )
  }
)

export default connect(
  mapStateToProps,
  null
)(ClientFormContainer)
