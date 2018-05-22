export const filterActivities = (activities, filter) =>
  activities
    .filter(a => `${a.owner.lastName}, ${a.owner.firstName}`
      .toLowerCase().includes(filter))
    .sort((a1, a2) => {
      let a = `${a1.owner.lastName}, ${a1.owner.firstName}`
      let b = `${a2.owner.lastName}, ${a2.owner.firstName}`

      return a.localeCompare(b)
    })

export const filterClients = (clients, filter) =>
  clients
    .filter(c =>
      c.businessId.toLowerCase().includes(filter) ||
      c.legalEntity.toLowerCase().includes(filter))
    .sort((c1, c2) =>
      c1.legalEntity.localeCompare(c2.legalEntity))

export const filterEmployees = (employees, filter) =>
  employees
    .filter(e =>
      `${e.lastName}, ${e.firstName}`
        .toLowerCase().includes(filter))
    .sort((e1, e2) =>
      e1.lastName.localeCompare(e2.lastName))

export const filterMaterials = (materials, filter) =>
  materials
    .filter(m => m.name.toLowerCase().includes(filter))
    .sort((m1, m2) =>
      m1.name.localeCompare(m2.name))

export const filterProjects = (projects, filter) =>
  projects
    .filter(p =>
      p.name.toLowerCase().includes(filter) ||
      p.projectId.toLowerCase().includes(filter) ||
      p.client.legalEntity.toLowerCase().includes(filter))
    .sort((p1, p2) =>
      p1.projectId.localeCompare(p2.projectId))

export const filterTasks = (tasks, filter) =>
  tasks
    .filter(t =>
      t.project.projectId.toLowerCase().includes(filter) ||
      t.name.toLowerCase().includes(filter))
    .sort((t1, t2) => {
      let a = `${t1.project.projectId}_${t1.name}`
      let b = `${t2.project.projectId}_${t2.name}`

      return a.localeCompare(b)
    })
