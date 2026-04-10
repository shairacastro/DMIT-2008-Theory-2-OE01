import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";

import {
  getWeatherForProfile,
  getWeatherLocationFromProfile,
} from "./weather";

describe("getWeatherLocationFromProfile", () => {
  it("prefers weather.location when provided", () => {
    const profile = {
      weather: { location: " Tokyo " },
      timeZone: { zone: "America/Edmonton" },
      contacts: { location: "Italy" },
    };

    expect(getWeatherLocationFromProfile(profile)).toBe("Tokyo");
  });

  it("uses city parsed from timeZone.zone when custom location is missing", () => {
    const profile = {
      timeZone: { zone: "America/Los_Angeles" },
      contacts: { location: "Italy" },
    };

    expect(getWeatherLocationFromProfile(profile)).toBe("Los Angeles");
  });

  it("falls back to contacts.location when timezone data is missing", () => {
    const profile = {
      contacts: { location: "Rome" },
    };

    expect(getWeatherLocationFromProfile(profile)).toBe("Rome");
  });
});

describe("getWeatherForProfile", () => {
  const profile = {
    timeZone: { zone: "America/Edmonton" },
    contacts: { location: "Italy" },
  };

  it("returns a friendly message when API key is missing", async () => {
    const result = await getWeatherForProfile(profile, "");

    expect(result).toEqual({
      location: "Edmonton",
      error:
        "Add your weather API key in local environment settings to show live weather.",
    });
  });

  it("maps API response into UI payload", async () => {
    server.use(
      http.get("https://api.openweathermap.org/data/2.5/weather", ({ request }) => {
        const url = new URL(request.url);

        expect(url.searchParams.get("q")).toBe("Edmonton");
        expect(url.searchParams.get("units")).toBe("metric");
        expect(url.searchParams.get("appid")).toBe("test-key");

        return HttpResponse.json({
          name: "Edmonton",
          sys: { country: "CA" },
          main: { temp: 7.4 },
          weather: [{ description: "moderate rain", icon: "10d" }],
        });
      })
    );

    const result = await getWeatherForProfile(profile, "test-key");

    expect(result).toEqual({
      location: "Edmonton, CA",
      temperatureC: 7.4,
      description: "Moderate Rain",
      iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
    });
  });

  it("returns error when API fails", async () => {
    server.use(
      http.get(
        "https://api.openweathermap.org/data/2.5/weather",
        () => new HttpResponse(null, { status: 500 })
      )
    );

    const result = await getWeatherForProfile(profile, "test-key");

    expect(result).toEqual({
      location: "Edmonton",
      error: "Unable to load current weather right now.",
    });
  });
});