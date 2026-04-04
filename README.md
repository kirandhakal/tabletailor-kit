# tabletailor-kit

Reusable React table component package built with TypeScript and Tailwind CSS.

## Features

- Pagination support (controlled or uncontrolled)
- Light and dark theme support
- `thead` and `tbody` background customization
- Built-in localization (`en`, `es`, `fr`) with override support
- Optional controls for row and column count
- Responsive layout with horizontal overflow handling

## Install

```bash
npm install tabletailor-kit
```

Peer dependencies:

```bash
npm install react react-dom
```

## Usage

```tsx
import { Table, type ColumnDef } from "tabletailor-kit";
import "tabletailor-kit/styles.css";

type Person = {
  id: number;
  name: string;
  role: string;
};

const data: Person[] = [
  { id: 1, name: "Ava", role: "Engineer" },
  { id: 2, name: "Noah", role: "Designer" }
];

const columns: ColumnDef<Person>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" }
];

export function DemoTable() {
  return (
    <Table
      data={data}
      columns={columns}
      theme="auto"
      locale="en"
      theadBg="slate"
      tbodyBg="default"
      defaultPageSize={5}
      pageSizeOptions={[5, 10, 20]}
      enableDimensionControls
    />
  );
}

## Examples

### Auto-Generate Serial Numbers (S.N)

Use the `enableSerialNumber` prop to automatically add a serial number column:

```tsx
import { Table } from "tabletailor-kit";

const data = [
  { id: 1, name: "Alice", role: "Engineer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
];

const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
];

function App() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSerialNumber={true}
      serialNumberHeader="S.N"
    />
  );
}
```

**Output:**
| S.N | Name | Role |
|-----|------|------|
| 1 | Alice | Engineer |
| 2 | Bob | Designer |
| 3 | Charlie | Manager |

## API Highlights

- `data`, `columns`: source rows and column definitions
- `page`, `onPageChange`: controlled page state
- `pageSize`, `onPageSizeChange`: controlled page size
- `theme`: `"light" | "dark" | "auto"`
- `locale`: `"en" | "es" | "fr"`
- `translations`: custom label overrides
- `theadBg`, `tbodyBg`: section background token customization
- `theadClassName`, `tbodyClassName`: section class overrides
- `enableDimensionControls`: shows row/column count inputs
- `rowCount`, `columnCount`: controlled dimension values

## Build

```bash
npm run build
```

## Test

```bash
npm test
```
