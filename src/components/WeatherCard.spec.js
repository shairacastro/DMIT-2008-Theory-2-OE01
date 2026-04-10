import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WeatherCard from "./WeatherCard";


vi.mock("./Card", () => ({
  default: ({ title, children }) =>
    createElement(
      "section",
      null,
      title ? createElement("h2", null, title) : null,
      children
    ),
}));

vi.mock("next/image", () => ({
  default: (props) => createElement("img", props),
}));

describe("WeatherCard", () => {
  it("renders current weather details", () => {
    const weather = {
      location: "Edmonton, CA",
      temperatureC: 12.7,
      description: "Moderate Rain",
      iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
    };

    render(createElement(WeatherCard, { weather }));

    expect(
      screen.getByRole("heading", { name: /current weather/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Edmonton, CA")).toBeInTheDocument();
    expect(screen.getByText("13°C")).toBeInTheDocument();
    expect(screen.getByText("Moderate Rain")).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Moderate Rain" })
    ).toHaveAttribute("src", weather.iconUrl);
  });

  it("renders fallback error content when weather data is unavailable", () => {
    render(
      createElement(WeatherCard, {
        weather: {
          location: "Edmonton",
          error: "Unable to load current weather right now.",
        },
      })
    );

    expect(screen.getByText("Edmonton")).toBeInTheDocument();

    expect(
      screen.getByText("Unable to load current weather right now.")
    ).toBeInTheDocument();

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});