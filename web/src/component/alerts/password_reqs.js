import React from "react"
import { List } from "semantic-ui-react"

const PasswordReqs = () =>
  <List bulleted>
    <List.Item
      content="Vähintään 8 merkkiä"
    />
    <List.Item
      content="Vähintään yksi iso kirjain A-Z"
    />
    <List.Item
      content="Vähintään yksi pieni kirjain a-z"
    />
    <List.Item
      content="Vähintään yksi numero 0-9"
    />
    <List.Item
      content="Sallitut erikoismerkit: ! # $ % &amp; ' * + . : , ; / = ? @ ^ _ ~ -"
    />
  </List>

export default PasswordReqs
