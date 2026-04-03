# Table Customization Examples

## 1. Auto-Generate Serial Numbers (S.N)

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

---

## 2. Custom Theme (Colors, Fonts, Styles)

Use the `customTheme` prop to customize the table appearance:

```tsx
import { Table } from "tabletailor-kit";

const data = [
  { id: 1, name: "Alice", role: "Engineer", status: "PUBLISHED" },
  { id: 2, name: "Bob", role: "Designer", status: "PUBLISHED" },
];

const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (value) => (
      <span style={{
        backgroundColor: "#10b981",
        color: "#fff",
        padding: "4px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600"
      }}>
        {value}
      </span>
    )
  },
];

function App() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSerialNumber={true}
      serialNumberHeader="S.N"
      customTheme={{
        headerBg: "#0051BA",        // Blue header background
        headerTextColor: "#FFFFFF", // White header text
        bodyBg: "#F5F5F5",          // Light gray body background
        bodyTextColor: "#000000",   // Black body text
        borderColor: "#E5E5E5",     // Light gray borders
        fontFamily: "Arial, sans-serif"
      }}
      defaultPageSize={10}
      showPagination={true}
    />
  );
}
```

---

## 3. Status Badges Example

Render custom status badges using the `cell` property:

```tsx
const columns = [
  { header: "Title", accessorKey: "title" },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (value) => {
      const colors = {
        PUBLISHED: { bg: "#10b981", text: "#fff" },
        DRAFT: { bg: "#f59e0b", text: "#fff" },
        ARCHIVED: { bg: "#6b7280", text: "#fff" }
      };
      
      const color = colors[value as keyof typeof colors] || { bg: "#e5e7eb", text: "#000" };
      
      return (
        <span style={{
          backgroundColor: color.bg,
          color: color.text,
          padding: "4px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
          display: "inline-block"
        }}>
          {value}
        </span>
      );
    }
  },
];
```

---

## 4. Action Buttons Example

Add action buttons using the `cell` property:

```tsx
const columns = [
  { header: "Title", accessorKey: "title" },
  { 
    header: "Action", 
    cell: (_, row) => (
      <button
        onClick={() => console.log("View", row)}
        style={{
          backgroundColor: "#22c55e",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600"
        }}
      >
        👁️ View
      </button>
    )
  },
];
```

---

## 5. Complete Example with All Features

```tsx
import { Table, ColumnDef } from "tabletailor-kit";

interface News {
  id: number;
  title: string;
  date: string;
  status: "PUBLISHED" | "DRAFT";
}

const data: News[] = [
  { 
    id: 1, 
    title: "निर्विचन प्रशासन सुनाश विष्ठको भीड़ूहक स्वस्थ प्रयोग नगन आयोको निर्देशन",
    date: "2082-11-11",
    status: "PUBLISHED"
  },
  { 
    id: 2, 
    title: "निर्विचन प्रशासनलाय नहिंसित स्थायीय कार्यपालिका पदाधिकारलाई आयोको निर्देशन",
    date: "2082-11-11",
    status: "PUBLISHED"
  },
  { 
    id: 3, 
    title: "CIB arrests six mountain rescue operators",
    date: "2082-10-13",
    status: "PUBLISHED"
  },
];

const columns: ColumnDef<News>[] = [
  { header: "Title", accessorKey: "title" },
  { header: "Date", accessorKey: "date" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (value) => (
      <span style={{
        backgroundColor: value === "PUBLISHED" ? "#10b981" : "#f59e0b",
        color: "#fff",
        padding: "4px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-block"
      }}>
        {value}
      </span>
    )
  },
  {
    header: "Action",
    cell: (_, row) => (
      <button
        onClick={() => console.log("View", row)}
        style={{
          backgroundColor: "#22c55e",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600"
        }}
      >
        👁️ View
      </button>
    )
  },
];

function App() {
  return (
    <Table<News>
      data={data}
      columns={columns}
      enableSerialNumber={true}
      serialNumberHeader="S.N"
      customTheme={{
        headerBg: "#0051BA",
        headerTextColor: "#FFFFFF",
        bodyBg: "#FFFFFF",
        bodyTextColor: "#000000",
        borderColor: "#E5E5E5"
      }}
      defaultPageSize={10}
      showPagination={true}
      locale="en"
    />
  );
}

export default App;
```

---

## 6. Available `CustomTheme` Options

```typescript
interface CustomTheme {
  headerBg?: string;           // Header background color (hex, rgb, or Tailwind class)
  headerTextColor?: string;    // Header text color
  bodyBg?: string;             // Body background color
  bodyTextColor?: string;      // Body text color
  borderColor?: string;        // Border color
  fontFamily?: string;         // Font family
}
```

### Color Format Support:
- **Hex colors**: `"#0051BA"`
- **RGB colors**: `"rgb(0, 81, 186)"`
- **Tailwind classes**: `"bg-blue-600"` (will not apply inline styles)

---

## Notes:

- Serial numbers are automatically generated based on row index (1-based)
- Custom theme colors can use hex, RGB, or Tailwind classes
- Status badges and action buttons are rendered using the `cell` property
- Pagination and other features work seamlessly with custom themes
