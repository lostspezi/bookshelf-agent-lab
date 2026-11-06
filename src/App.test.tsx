import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

async function addKindred() {
  await userEvent.type(screen.getByLabelText("Title"), "Kindred");
  await userEvent.type(screen.getByLabelText("Author"), "Octavia E. Butler");
  await userEvent.type(screen.getByLabelText("Year"), "1979");
  await userEvent.click(screen.getByRole("button", { name: "Add book" }));
}

describe("App: add a book", () => {
  beforeEach(() => localStorage.clear());

  it("includes the new book in the statistics", async () => {
    render(<App />);
    expect(screen.getByText("Books: 5")).toBeInTheDocument();
    await addKindred();
    expect(screen.getByText("Books: 6")).toBeInTheDocument();
    expect(screen.getByText("Read: 2")).toBeInTheDocument();
    expect(screen.getByText("Average rating: 4")).toBeInTheDocument();
  });

  it("keeps the added book after a reload", async () => {
    const first = render(<App />);
    await addKindred();
    first.unmount();
    render(<App />);
    expect(screen.getByText("Kindred")).toBeInTheDocument();
    expect(screen.getByText("Books: 6")).toBeInTheDocument();
  });
});
