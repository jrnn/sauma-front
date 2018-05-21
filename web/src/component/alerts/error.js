import PropTypes from "prop-types"
import React from "react"
import { Message } from "semantic-ui-react"

const Error = ({ message }) =>
  <Message
    align="center"
    error
    content={message || "Sivua/resurssia ei ole olemassa, älä pelleile osoitepalkin kanssa!"}
    header="Virhetilanne!"
  />

Error.propTypes = {
  message : PropTypes.string
}

export default Error
