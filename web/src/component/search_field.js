import React from "react"
import { Input } from "semantic-ui-react"

const SearchField = ({ onChange, value }) => (
  <Input
    icon="search"
    onChange={onChange}
    placeholder="Kirjoita hakusana"
    value={value}
  />
)

export default SearchField
