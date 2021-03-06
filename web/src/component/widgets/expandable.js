import PropTypes from "prop-types"
import React from "react"
import { Button } from "semantic-ui-react"

class Expandable extends React.Component {
  constructor() {
    super()
    this.state = { open : false }
  }

  toggle = () =>
    this.setState({ open : !this.state.open })

  render = () =>
    ( !this.state.open )
      ? <Button
        content={this.props.button}
        fluid
        onClick={this.toggle}
      />
      : this.props.children
}

Expandable.propTypes = {
  button : PropTypes.string.isRequired,
  children : PropTypes.element.isRequired
}

export default Expandable
