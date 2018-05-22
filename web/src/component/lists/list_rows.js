import React from "react"
import { formatDate } from "../../util/parser"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

export const activityRow = (a) =>
  <List.Item
    as={Link}
    key={a.id}
    to={`/activities/${a.id}`}
  >
    <List.Icon
      color="grey"
      name={( a.signed )
        ? "check circle outline"
        : "circle outline"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${formatDate(a.date)} — ${a.owner.lastName}, ${a.owner.firstName}`}
      />
      <List.Description
        content={`${a.hours} tuntia`}
      />
    </List.Content>
  </List.Item>

export const clientRow = (c) =>
  <List.Item
    as={Link}
    key={c.id}
    to={`/clients/${c.id}`}
  >
    <List.Icon
      color="grey"
      name="suitcase"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={c.legalEntity}
      />
      <List.Description
        content={c.businessId}
      />
    </List.Content>
  </List.Item>

export const employeeRow = (e) =>
  <List.Item
    as={Link}
    key={e.id}
    to={`/employees/${e.id}`}
  >
    <List.Icon
      color="grey"
      name={( e.enabled )
        ? "check"
        : "ban"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${e.lastName}, ${e.firstName}`}
      />
      <List.Description
        content={( e.administrator )
          ? "Työnjohtaja"
          : "Työntekijä"
        }
      />
    </List.Content>
  </List.Item>

export const materialRow = (m) =>
  <List.Item
    as={Link}
    key={m.id}
    to={`/materials/${m.id}`}
  >
    <List.Icon
      color="grey"
      name="cube"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={m.name}
      />
      <List.Description
        content={`${m.unitCost}€ / ${m.unit}`}
      />
    </List.Content>
  </List.Item>

export const projectRow = (p) =>
  <List.Item
    as={Link}
    key={p.id}
    to={`/projects/${p.id}`}
  >
    <List.Icon
      color="grey"
      name="industry"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${p.projectId} — ${p.name}`}
      />
      <List.Description
        content={p.client.legalEntity}
      />
    </List.Content>
  </List.Item>

export const taskRow = (t) =>
  <List.Item
    as={Link}
    key={t.id}
    to={`/tasks/${t.id}`}
  >
    <List.Icon
      color="grey"
      name={( t.completed )
        ? "check circle outline"
        : "circle outline"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${t.project.projectId} — ${t.name}`}
      />
      <List.Description
        content={`${formatDate(t.startDate)} — ${formatDate(t.endDate)}`}
      />
    </List.Content>
  </List.Item>
