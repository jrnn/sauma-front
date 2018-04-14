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

export const employeeState = (e) => (
  {
    administrator : e.administrator || false,
    email : e.email || "",
    enabled : e.enabled || true,
    firstName : e.firstName || "",
    lastName : e.lastName || "",
    phone : e.phone || "",
    username : e.username || ""
  }
)
