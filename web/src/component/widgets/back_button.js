import PropTypes from "prop-types"
import React, { Component } from "react"
import { Icon } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

class BackButton extends Component {
  handleClick = (e) => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render = () => {
    const { pathname } = this.props.history.location
    const pathParts = ( !pathname )
      ? []
      : pathname.split("/")

    return ( pathParts.length < 3 )
      ? null
      : <Icon
          inverted
          name="angle double left"
          onClick={this.handleClick}
          size="large"
        />
  }
}

BackButton.propTypes = {
  history : PropTypes.object.isRequired,
}

export default withRouter(BackButton)
