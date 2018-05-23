import { formatDate, trimDescription } from "../../util/parser"

export const filterActivities = (activities, filter) =>
  activities
    .filter(a => {
      let d = trimDescription(a.description)
      let h = `${formatDate(a.date)} — ${a.owner.lastName}, ${a.owner.firstName}`

      return ( d.toLowerCase().includes(filter) ||
               h.toLowerCase().includes(filter))
    })
    .sort((a1, a2) => {
      let a = `${formatDate(a1.date)} — ${a1.owner.lastName}, ${a1.owner.firstName}`
      let b = `${formatDate(a2.date)} — ${a2.owner.lastName}, ${a2.owner.firstName}`

      return a.localeCompare(b)
    })

export const filterActivitiesForEmployee = (activities, filter) =>
  activities
    .filter(a => {
      let d = `${a.project.projectId} — ${a.task.name}`
      let h = `${formatDate(a.date)} — ${a.hours} tuntia`

      return ( d.toLowerCase().includes(filter) ||
               h.toLowerCase().includes(filter))
    })
    .sort((a1, a2) => {
      if ( formatDate(a1.date) !== formatDate(a2.date) )
        return Date.parse(a2.date) - Date.parse(a1.date)

      let a = `${a1.project.projectId} — ${a1.task.name}`
      let b = `${a2.project.projectId} — ${a2.task.name}`

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

export const filterProjectsForClient = (projects, filter) =>
  projects
    .filter(p => {
      let d = `${formatDate(p.startDate)} — ${formatDate(p.endDate)}`
      let h = `${p.projectId} — ${p.name}`

      return ( d.toLowerCase().includes(filter) ||
               h.toLowerCase().includes(filter))
    })
    .sort((p1, p2) =>
      p1.projectId.localeCompare(p2.projectId))

export const filterTasks = (tasks, filter) =>
  tasks
    .filter(t => {
      let d = `${formatDate(t.startDate)} — ${formatDate(t.endDate)}`
      let h = `${t.project.projectId} — ${t.name}`

      return ( d.toLowerCase().includes(filter) ||
               h.toLowerCase().includes(filter))
    })
    .sort((t1, t2) => {
      let a = `${t1.project.projectId}_${t1.name}`
      let b = `${t2.project.projectId}_${t2.name}`

      return a.localeCompare(b)
    })

export const filterTasksForProject = (tasks, filter) =>
  tasks
    .filter(t =>
      t.name.toLowerCase().includes(filter) ||
      `${formatDate(t.startDate)} — ${formatDate(t.endDate)}`
        .toLowerCase().includes(filter))
    .sort((t1, t2) =>
      Date.parse(t2.startDate) - Date.parse(t1.startDate))
