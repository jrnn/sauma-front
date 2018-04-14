export const addressState = (a) => (
  {
    street : a.street || "",
    streetExt : a.streetExt || "",
    zipCode : a.zipCode || "",
    city : a.city || "",
    country : a.country || ""
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
