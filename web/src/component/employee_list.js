import React from "react"
import SearchField from "./widgets/search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) => (
  <List.Item
    as={Link}
    key={e.id}
    to={`/employees/${e.id}`}
  >
    <List.Icon
      color="grey"
      name={( e.enabled )
        ? "check"
        : "ban"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${e.lastName}, ${e.firstName}`}
      />
      <List.Description
        content={( e.administrator )
          ? "Työnjohtaja"
          : "Työntekijä"
        }
      />
    </List.Content>
  </List.Item>
)

const buttons = (admin) => (
  ( !admin )
    ? null
    : <Button
      as={Link}
      content="Lisää uusi"
      fluid
      to="/employees/new"
    />
)

const EmployeeList = (props) => {
  let { admin, employees, filter, onChange } = props

  return (
    <div>
      <SearchField
        onChange={onChange}
        value={filter}
      />
      <List divided relaxed>
        {employees.map(e => asRow(e))}
      </List>
      {buttons(admin)}
    </div>
  )
}

export default EmployeeList
