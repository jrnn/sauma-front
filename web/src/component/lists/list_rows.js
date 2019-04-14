import React from "react"
import { formatDate, trimDescription } from "../../util/parser"
import { Button, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

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
        content={`${formatDate(a.date)} — ${a.owner.lastName}, ${a.owner.firstName} (${a.hours} tuntia)`}
      />
      <List.Description
        content={trimDescription(a.description)}
      />
    </List.Content>
  </List.Item>

export const activityRowForEmployee = (a) =>
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
        content={`${formatDate(a.date)} — ${a.hours} tuntia`}
      />
      <List.Description
        content={`${a.project.projectId} — ${a.task.name}`}
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

export const employeeRowForProject = (removeFunc) =>
  (e) =>
    <List.Item
      as={Link}
      key={e.id}
      to={`/employees/${e.id}`}
    >
      <List.Content floated="right">
        {( !removeFunc )
          ? null
          : <Button
            basic
            compact
            icon="delete"
            name={e.id}
            onClick={removeFunc}
          />
        }
      </List.Content>
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
      <List.Description
        content={p.client.legalEntity}
      />
      <List.Header
        content={`${p.name} (${p.projectId})`}
      />
    </List.Content>
  </List.Item>

export const projectRowForClient = (p) =>
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
      <List.Description
        content={`${formatDate(p.startDate)} — ${formatDate(p.endDate)}`}
      />
      <List.Header
        content={`${p.name} (${p.projectId})`}
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
      <List.Description
        content={`${formatDate(t.startDate)} — ${formatDate(t.endDate)}`}
      />
      <List.Header
        content={`${t.project.name} — ${t.name}`}
      />
    </List.Content>
  </List.Item>

export const taskRowForProject = (t) =>
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
      <List.Description
        content={`${formatDate(t.startDate)} — ${formatDate(t.endDate)}`}
      />
      <List.Header
        content={`${t.name} (${t.daysNeeded} työpäivää)`}
      />
    </List.Content>
  </List.Item>
