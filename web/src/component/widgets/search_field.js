import PropTypes from "prop-types"
import React from "react"
import { Input } from "semantic-ui-react"

const SearchField = ({ onChange, value }) =>
  <Input
    fluid
    icon="search"
    onChange={onChange}
    placeholder="Kirjoita hakusana"
    value={value}
  />

SearchField.propTypes = {
  onChange : PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
}

export default SearchField
