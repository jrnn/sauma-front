import App from "./app"
import React from "react"
import { render } from "react-dom"
import store from "./store"
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"
import "./index.css"

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route
        component={App}
        path="/"
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
