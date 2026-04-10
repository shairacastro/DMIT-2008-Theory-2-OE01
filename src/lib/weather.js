function toTitleCase(value = "") {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getWeatherLocationFromProfile(profile) {
  const customLocation = profile?.weather?.location?.trim();
  if (customLocation) return customLocation;

  const timeZone = profile?.timeZone?.zone;
  if (timeZone?.includes("/")) {
    return timeZone.split("/").pop().replace(/_/g, " ");
  }

  const contactLocation = profile?.contacts?.location?.trim();
  if (contactLocation) return contactLocation;

  return "Edmonton";
}

export async function getWeatherForProfile(profile, apiKey) {
  const location = getWeatherLocationFromProfile(profile);

  if (!apiKey) {
    return {
      location,
      error:
        "Add your weather API key in local environment settings to show live weather.",
    };
  }

  const weatherUrl = new URL(
    "https://api.openweathermap.org/data/2.5/weather"
  );

  weatherUrl.searchParams.set("q", location);
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("appid", apiKey);


  try {
    const response = await fetch(weatherUrl.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OpenWeather request failed");
    }

    const current = data?.weather?.[0] || {};

    return {
      location: `${data.name}, ${data.sys.country}`,
      temperatureC: data.main?.temp ?? null,
      description: toTitleCase(current.description || ""),
      iconUrl: current.icon
        ? `https://openweathermap.org/img/wn/${current.icon}@2x.png`
        : null,
    };
  } catch (err) {
    return {
      location,
      error: "Failed to load weather.",
    };
  }
}