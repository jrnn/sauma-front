import React from "react"
import SearchField from "./search_field"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) => (
  <List.Item
    key={e.id}
    as={Link}
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
      content="Lisää uusi"
      as={Link} to="/employees/new"
      fluid
    />
)

const EmployeeList = ({ admin, employees, filter, onChange }) => (
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

export default EmployeeList
