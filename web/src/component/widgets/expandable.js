import React from "react"
import { Button } from "semantic-ui-react"

class Expandable extends React.Component {
  constructor() {
    super()
    this.state = { open : false }
  }

  toggle = () =>
    this.setState({ open : !this.state.open })

  render = () => {
    return (
      ( !this.state.open )
        ? <Button
          content={this.props.button}
          fluid
          onClick={this.toggle}
        />
        : this.props.children
    )
  }
}

export default Expandable
