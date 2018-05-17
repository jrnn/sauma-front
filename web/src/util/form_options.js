export const clientOptions = (clients, project) =>
  ( project && project.client )
    ? [
      {
        key : project.client.id,
        text : project.client.legalEntity,
        value : project.client.id
      }
    ]
    : clients.map(c => (
      {
        key : c.id,
        text : c.legalEntity,
        value : c.id
      }
    )).sort((c1, c2) =>
      c1.text.localeCompare(c2.text))

export const managerOptions = (employees) =>
  employees
    .filter(e => e.administrator)
    .map(e => ({
      key : e.id,
      text : `${e.lastName}, ${e.firstName}`,
      value : e.id
    }))
    .sort((e1, e2) =>
      e1.text.localeCompare(e2.text))

export const quotaOptions = (materials, quotas) => {
  let materialIds = quotas
    .map(q => q.material.id)

  return materials
    .filter(m => !materialIds.includes(m.id))
    .sort((m1, m2) => m1.name.localeCompare(m2.name))
    .map(m => ({
      key : m.id,
      text : m.name,
      value : m.id
    }))
}

export const unassignedOptions = (employees, project) => {
  let assignedIds = project.employees
    .map(e => e.id)

  return employees
    .filter(e => !assignedIds.includes(e.id))
    .map(e => ({
      key : e.id,
      text : `${e.lastName}, ${e.firstName}`,
      value : e.id
    }))
    .sort((e1, e2) =>
      e1.text.localeCompare(e2.text))
}
