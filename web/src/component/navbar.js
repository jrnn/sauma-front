import React from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

const items = (logout) => [
  {
    key : "projects",
    content : "Työmaat",
    as : Link,
    to : "/projects",
    admin : 1
  },
  {
    key : "clients",
    content : "Asiakkaat",
    as : Link,
    to : "/clients",
    admin : 1
  },
  {
    key : "employees",
    content : "Henkilöstö",
    as : Link,
    to : "/employees",
    admin : 0
  },
  {
    key : "logout",
    content : "Kirjaudu ulos",
    as : Link,
    to : "/",
    onClick : logout,
    admin : 0
  }
]

const NavBar = ({ admin, logout }) => (
  <Menu
    items={( admin )
      ? items(logout)
      : items(logout).filter(i => i.admin === 0)
    }
  />
)

export default NavBar
