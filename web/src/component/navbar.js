import React from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

const NavBar = ({ logout }) => (
  <Menu>
    <Menu.Item
      as={Link} to="/projects"
      content="Työmaat"
      disabled
    />
    <Menu.Item
      as={Link} to="/clients"
      content="Asiakkaat"
    />
    <Menu.Item
      as={Link} to="/employees"
      content="Henkilöstö"
    />
    <Menu.Item
      as={Link} to="/"
      content="Kirjaudu ulos"
      onClick={logout}
    />
  </Menu>
)

export default NavBar
