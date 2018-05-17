import React from "react"
import { Label } from "semantic-ui-react"

const FormError = ({ error }) => (
  ( !error )
    ? null
    : <Label
      basic
      color="red"
      content={error}
      pointing
    />
)

export default FormError
