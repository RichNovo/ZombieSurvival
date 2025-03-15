import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSurvivorForm from "../components/AddSurvivorForm";
import api from "../utils/apiSetup";

jest.mock("../utils/apiSetup", () => ({
  createSurvivorSurvivorsPost: jest.fn(),
}));

describe("AddSurvivorForm", () => {
  it("renders correctly", () => {
    render(<AddSurvivorForm fetchSurvivors={jest.fn()} />);
    expect(screen.getByText(/register new survivor/i)).toBeInTheDocument();
  });
});

describe("AddSurvivorForm", () => {
  const mockFetchSurvivors = jest.fn();

  beforeEach(() => {
    render(<AddSurvivorForm fetchSurvivors={mockFetchSurvivors} />);
  });

  it("renders form fields correctly", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/longitude/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it("allows user input", () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText(/latitude/i), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText(/longitude/i), {
      target: { value: "90" },
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/age/i)).toHaveValue(30);
    expect(screen.getByLabelText(/latitude/i)).toHaveValue(45);
    expect(screen.getByLabelText(/longitude/i)).toHaveValue(90);
  });

  it("submit form fails, gender is not set", async () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "30" },
    });

    fireEvent.change(screen.getByLabelText(/latitude/i), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText(/longitude/i), {
      target: { value: "45" },
    });

    fireEvent.click(screen.getByText(/submit/i));
    await waitFor(() => {
      expect(api.createSurvivorSurvivorsPost).toHaveBeenCalledTimes(0);
    });
  });

  it("submits form correctly", async () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "30" },
    });

    const select = screen.getByLabelText(/gender/i);
    // Open the dropdown
    await userEvent.click(select);
    // Select the "Female" option
    const option = screen.getByRole("option", { name: /female/i });
    await userEvent.click(option);

    fireEvent.change(screen.getByLabelText(/latitude/i), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText(/longitude/i), {
      target: { value: "45" },
    });

    fireEvent.click(screen.getByText(/submit/i));
    await waitFor(() => {
      expect(api.createSurvivorSurvivorsPost).toHaveBeenCalled();
    });
  });
});
