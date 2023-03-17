import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
	test("renders Planner view by default", async () => {
		render(<App />);

		const plannerView = await screen.findByText(/planner/i);
		expect(plannerView).toBeInTheDocument();
	});
});
