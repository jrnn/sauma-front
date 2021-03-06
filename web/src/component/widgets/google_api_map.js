import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

const loadApi = (apiKey) => {
  const s = document.createElement("script")

  s.async = true
  s.defer = true
  s.id = "google-map-api"
  s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  s.type = "text/javascript"

  document.body.appendChild(s)
}

const renderMap = (mapRef, addresses) => {
  /**
   * For whatever reason the mapRef is not available immediately
   * on function call. Shit workaround with setTimeout() ...
   */
  setTimeout(() => {
    const { Map, Marker } = window.google.maps
    const center = { lat : 60.25, lng : 24.95 }
    const map = new Map(
      mapRef.current,
      { center, zoom : 10 }
    )
    addresses
      .filter(a => !!a.location)
      .map(a => a.location)
      .map(position => new Marker({ map, position }))
  }, 50)
}

class GoogleApiMap extends React.Component {
  constructor() {
    super()
    this.mapRef = React.createRef()
  }

  componentDidMount = () => {
    if ( !document.getElementById("google-map-api") )
      loadApi(process.env.REACT_APP_GOOGLE_API_KEY)
  }

  render = () =>
    ( !window.google )
      ? null
      : <div
        ref={this.mapRef}
        style={{
          height : "400px",
          width : "100%"
        }}
      >
        {renderMap(this.mapRef, this.props.addresses)}
      </div>
}

const mapStateToProps = (state) => (
  {
    addresses : state.projects.data.items
      .map(p => p.address)
  }
)

GoogleApiMap.propTypes = {
  addresses : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(
  mapStateToProps,
  null
)(GoogleApiMap)
