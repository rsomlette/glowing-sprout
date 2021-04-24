import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";

test("renders the Footer", () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Copyright 2020 Yummit/i);
  expect(linkElement).toBeInTheDocument();
});
