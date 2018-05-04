import React from "react"

const url = ({ city, street, zipCode }) => {
  let key = process.env.REACT_APP_GOOGLE_API_KEY
  let q = encodeURI(`${street},${zipCode},${city}`)

  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}`
}

const EmbeddedMap = ({ address }) => (
  <div className="padded">
    <iframe
      frameBorder="0"
      height="320"
      style={{ border: 0 }}
      width="640"
      src={url(address)}
    >
    </iframe>
  </div>
)

export default EmbeddedMap
