import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./Table";

type Row = {
  id: number;
  name: string;
  city: string;
};

const data: Row[] = [
  { id: 1, name: "Ava", city: "Berlin" },
  { id: 2, name: "Noah", city: "Madrid" },
  { id: 3, name: "Mia", city: "Paris" },
  { id: 4, name: "Leo", city: "Rome" }
];

const columns = [
  { header: "Name", accessorKey: "name" as const },
  { header: "City", accessorKey: "city" as const }
];

describe("Table", () => {
  it("paginates rows", () => {
    render(
      <Table
        data={data}
        columns={columns}
        defaultPageSize={2}
        pageSizeOptions={[2, 4]}
      />
    );

    expect(screen.getByText("Ava")).toBeInTheDocument();
    expect(screen.queryByText("Mia")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("Mia")).toBeInTheDocument();
  });

  it("applies locale labels", () => {
    render(<Table data={data} columns={columns} locale="es" defaultPageSize={2} />);
    expect(screen.getByText("Filas por pagina")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeInTheDocument();
  });

  it("supports dark theme class", () => {
    const { container } = render(<Table data={data} columns={columns} theme="dark" />);
    expect(container.firstChild).toHaveClass("tabletailor-dark");
  });

  it("updates visible rows from controls", () => {
    render(
      <Table
        data={data}
        columns={columns}
        enableDimensionControls
        defaultPageSize={10}
        showPagination={false}
      />
    );

    expect(screen.getByText("Rome")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Rows"), { target: { value: "2" } });

    expect(screen.queryByText("Rome")).not.toBeInTheDocument();
  });
});
