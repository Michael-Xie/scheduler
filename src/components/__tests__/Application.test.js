import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Get the first appointment, which is empty
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    // 4. Click the Add button
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Fill in student name and select interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click Save, and expects the Saving progress to show
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // scoping from container to appointment of interest
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the name and save the interview
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Name Change" }
    });
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. Wait until the element with "Name Change" to display
    await waitForElement(() => getByText(appointment, "Name Change"));
    
    // 7. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    // expect no change to spots remaining from edit
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {
    // 1. Reject axios put request when called later in test
    axios.put.mockRejectedValueOnce();

    // 2. Render the Application
    const { container, debug } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Narrow scope to an empty appointment, and click 'Add' to create appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Write name "Lydia Miller-Jones" and select interviewer "Sylvia Palmer"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click 'Save' and the put request will be rejected
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Click 'Close' to close the Error message
    // NOTE: need to wait for error to render
    await waitForElement(() => getByText(appointment, "Error"));
    fireEvent.click(getByAltText(appointment, "Close"));

    // 8. Check that we are at CREATE mode with Enter Student Name input
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Reject axios delete request when called later in test
    axios.delete.mockRejectedValueOnce();
    
    // 2. Render the Application
    const { container, debug } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 5. Check that the confirmation message is shown and click "Confirm".
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Click 'Close' to close the Error message
    // NOTE: need to wait for error to render
    await waitForElement(() => getByText(appointment, "Error"));
    fireEvent.click(getByAltText(appointment, "Close"));

    // 6. Check that we are at SHOW mode with "Archie Cohen"
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  })
});