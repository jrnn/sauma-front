import React from "react"
import { formatDate } from "../util/parser"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

const asRow = (a) => (
  <List.Item
    as={Link}
    key={a.key}
    target="_blank"
    to={a.url}
  >
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
  return (
    <List divided relaxed>
      {props.attachments
        .sort((a1, a2) => Date.parse(a2.createdOn) - Date.parse(a1.createdOn))
        .map(asRow)
      }
    </List>
  )
}

export default AttachmentList
