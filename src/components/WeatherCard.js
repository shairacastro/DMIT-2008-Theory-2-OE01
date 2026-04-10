import Card from "./Card";

function formatTemperature(temperatureC) {
  if (typeof temperatureC !== "number") return "--";
  return `${Math.round(temperatureC)}°C`;
}

export default function WeatherCard({ weather }) {
  const hasWeather =
    weather &&
    typeof weather.temperatureC === "number" &&
    weather.description;

  return (
    <Card colSpan="md:col-span-1" rowSpan="md:row-span-2" title="Current weather">
      <div className="flex h-full flex-col justify-between gap-4">

        {/* Location */}
        <p className="text-xs text-neutral-400">
          {weather?.location || "Location unavailable"}
        </p>

        {/* Weather data */}
        {hasWeather ? (
          <div className="flex items-center gap-3">
            {weather.iconUrl && (
              <img
                src={weather.iconUrl}
                alt={weather.description}
                className="h-16 w-16 object-contain"
              />
            )}

            <div className="flex flex-col">
              <p className="text-3xl leading-none font-serif">
                {formatTemperature(weather.temperatureC)}
              </p>
              <p className="text-sm font-light text-neutral-300">
                {weather.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm font-light text-neutral-300">
            {weather?.error || "Weather data unavailable."}
          </p>
        )}
      </div>
    </Card>
  );
}