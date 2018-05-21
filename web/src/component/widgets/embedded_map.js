import PropTypes from "prop-types"
import React from "react"

const url = ({ city, street, zipCode }) => {
  let key = process.env.REACT_APP_GOOGLE_API_KEY
  let query = encodeURI(`${street},${zipCode},${city}`)

  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${query}`
}

const EmbeddedMap = ({ address, id }) =>
  <div className="padded">
    <iframe
      frameBorder="0"
      height="320"
      style={{
        border : 0,
        width : "100%"
      }}
      title={id}
      width="640"
      src={url(address)}
    />
  </div>

EmbeddedMap.propTypes = {
  address : PropTypes.shape({
    city : PropTypes.string,
    street : PropTypes.string,
    zipCode : PropTypes.string
  }),
  id : PropTypes.string.isRequired
}

export default EmbeddedMap
