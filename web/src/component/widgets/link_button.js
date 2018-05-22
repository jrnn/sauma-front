import PropTypes from "prop-types"
import React from "react"
import { Button, Divider } from "semantic-ui-react"
import { Link } from "react-router-dom"

const LinkButton = ({ active, href, label }) =>
  ( !active )
    ? null
    : <div>
      <Divider />
      <Button
        as={Link}
        content={label}
        fluid
        to={href}
      />
    </div>

LinkButton.propTypes = {
  active : PropTypes.bool.isRequired,
  href : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
}

export default LinkButton
