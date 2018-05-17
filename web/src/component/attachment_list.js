import React from "react"
import { Button, List } from "semantic-ui-react"
import { formatDate } from "../util/parser"

const asRow = (a, onClick) => (
  <List.Item key={a.blob}>
    <List.Content floated="right">
      <Button
        basic
        compact
        icon="save"
        onClick={() => onClick(a.blob)}
      />
    </List.Content>
    <List.Icon
      color="grey"
      name="file text outline"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header content={a.name} />
      <List.Description
        content={`${formatDate(a.createdOn)} — ${a.owner.firstName} ${a.owner.lastName}`}
      />
    </List.Content>
  </List.Item>
)

const AttachmentList = (props) => {
  let { attachments, onClick } = props

  return (
    <List divided relaxed>
      {attachments
        .sort((a1, a2) => Date.parse(a2.createdOn) - Date.parse(a1.createdOn))
        .map(a => asRow(a, onClick))
      }
    </List>
  )
}

export default AttachmentList
