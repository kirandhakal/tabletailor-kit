# tabletailor-kit

Reusable React table component package built with TypeScript and Tailwind CSS.

## Features

- Pagination support
- Light and dark theme support
- Customizable table headers and rows
- Built-in localization with override support
- Responsive layout

## Installation

Install the package and its peer dependencies:

```bash
npm install tabletailor-kit react react-dom
```
or 
```bash
npm install tabletailor-kit 
```
## Quick Start

1. Import the `Table` component and styles:

```tsx
import { Table } from "tabletailor-kit";
import "tabletailor-kit/styles.css";
```

2. Define your data and columns:

```tsx
const data = [
  { id: 1, name: "Alice", role: "Engineer" },
  { id: 2, name: "Bob", role: "Designer" },
];

const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
];
```

3. Render the table:

```tsx
function App() {
  return (
    <Table
      data={data}
      columns={columns}
      theme="auto"
      locale="en"
    />
  );
}
```

## Examples

### Add Serial Numbers

Enable serial numbers with the `enableSerialNumber` prop:

```tsx
<Table
  data={data}
  columns={columns}
  enableSerialNumber={true}
  serialNumberHeader="S.N"
/>
```

**Output:**
| S.N | Name | Role |
|-----|------|------|
| 1   | Alice | Engineer |
| 2   | Bob   | Designer |

## API Overview

- `data`: Array of row data
- `columns`: Array of column definitions
- `theme`: Table theme (`"light" | "dark" | "auto"`)
- `locale`: Localization (`"en" | "es" | "fr"`)
- `enableSerialNumber`: Adds a serial number column

## Build and Test

Build the package:

```bash
npm run build
```

Run tests:

```bash
npm test
```
