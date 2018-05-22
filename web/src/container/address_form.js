import AddressForm from "../component/forms/address_form"
import PropTypes from "prop-types"
import React from "react"

class AddressFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.address
  }

  handleChange = (e, { name, value }) => {
    let address = {
      ...this.state,
      [name] : value
    }

    this.setState(address)
    this.props.sync(address)
  }

  render = () =>
    <AddressForm
      errors={this.props.errors}
      onChange={this.handleChange}
      readOnly={this.props.readOnly}
      state={this.state}
    />
}

AddressFormContainer.propTypes = {
  address : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  readOnly : PropTypes.bool.isRequired,
  sync : PropTypes.func.isRequired
}

export default AddressFormContainer
