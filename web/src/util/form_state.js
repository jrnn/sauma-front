import { formatDate } from "./parser"

export const activityState = (a) => {
  let state = {
    description : a.description || "",
    hours : a.hours || "",
    quotas : a.quotas || []
  }

  state.date = ( a.date )
    ? formatDate(a.date)
    : ""
  state.contractScope = ( a.id )
    ? a.contractScope
    : true
  state.signed = ( a.id )
    ? a.signed
    : false

  return state
}

export const addressState = (a) => (
  {
    city : a.city || "",
    country : a.country || "",
    street : a.street || "",
    streetExt : a.streetExt || "",
    zipCode : a.zipCode || ""
  }
)

export const clientState = (c) => {
  let state = {
    businessId : c.businessId || "",
    domicile : c.domicile || "",
    legalEntity : c.legalEntity || ""
  }

  return state
}

export const employeeState = (e) => {
  let state = {
    email : e.email || "",
    firstName : e.firstName || "",
    lastName : e.lastName || "",
    phone : e.phone || "",
    username : e.username || ""
  }

  state.administrator = ( e.id )
    ? e.administrator
    : false
  state.enabled = ( e.id )
    ? e.enabled
    : true

  state.address = addressState(e.address || {})
  return state
}

export const materialState = (m) => (
  {
    name : m.name || "",
    unit : m.unit || "",
    unitCost : m.unitCost || ""
  }
)

export const projectState = (p) => {
  let state = {
    contactPerson : p.contactPerson || "",
    name : p.name || "",
    phone : p.phone || "",
    projectId : p.projectId || ""
  }

  state.endDate = ( p.endDate )
    ? formatDate(p.endDate)
    : ""
  state.startDate = ( p.startDate )
    ? formatDate(p.startDate)
    : ""

  state.client = ( p.client )
    ? p.client.id
    : null
  state.manager = ( p.manager )
    ? p.manager.id
    : null

  state.address = addressState(p.address || {})
  return state
}

export const taskState = (t) => {
  let state = {
    name : t.name || "",
    description : t.description || "",
    daysNeeded : t.daysNeeded || "",
    quotas : t.quotas || []
  }

  state.endDate = ( t.endDate )
    ? formatDate(t.endDate)
    : ""
  state.startDate = ( t.startDate )
    ? formatDate(t.startDate)
    : ""
  state.completed = ( t.id )
    ? t.completed
    : false

  return state
}
