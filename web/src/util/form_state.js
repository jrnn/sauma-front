const formatDate = (date) => {
  try {
    return new Date(date)
      .toISOString()
      .substring(0, 10)

  } catch (ex) {
    return ""
  }
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

export const clientState = (c) => (
  {
    businessId : c.businessId || "",
    contactPerson : c.contactPerson || "",
    email : c.email || "",
    legalEntity : c.legalEntity || "",
    phone : c.phone || ""
  }
)

export const employeeState = (e) => {
  let state = {
    email : e.email || "",
    firstName : e.firstName || "",
    lastName : e.lastName || "",
    phone : e.phone || "",
    username : e.username || ""
  }

  state.administrator = ( e )
    ? e.administrator
    : false
  state.enabled = ( e )
    ? e.enabled
    : true

  return state
}

export const projectState = (p) => {
  let state = { projectId : p.projectId || "" }

  state.endDate = ( p.endDate )
    ? formatDate(p.endDate)
    : ""
  state.startDate = ( p.startDate )
    ? formatDate(p.startDate)
    : ""

  state.client = ( p.client )
    ? p.client.id
    : ""
  state.manager = ( p.manager )
    ? p.manager.id
    : ""

  return state
}
