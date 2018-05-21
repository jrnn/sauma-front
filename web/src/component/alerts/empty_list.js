import React from "react"
import { List } from "semantic-ui-react"

const EmptyList = () => (
  <List.Item disabled>
    <List.Content align="center" >
      <List.Header content="( Ei osumia! )" />
      <List.Description
        content="Joko lista on tyhjä, tai hakuehtoja vastaavia merkintöjä ei löydy."
      />
    </List.Content>
  </List.Item>
)

export default EmptyList
