# Weather Setup

This app uses the OpenWeatherMap current weather API on the server side.

## Get a Free API Key

1. Create a free account at [openweathermap.org](https://openweathermap.org/).
2. Verify your email address.
3. In your account dashboard, open the API key section and create (or copy) a key.
4. Wait for key activation if needed (new keys can take a short time to start working).

## Configure the App

1. Create a local env file from the `.env.example` example and name it `.env.local`.
2. Open [`.env.local`](../.env.local).
3. Set your key:

```env
OPENWEATHER_API_KEY=your_key_here
```

4. Restart the dev server if it is already running (`pnpm dev`).
5. **Note:** The `.env.local` should ***not*** be part of your version control history; it is already identified in the `.gitignore` as something not to be included.

## How Location Is Chosen

The weather request location is read from `src/data/profile.json` in this order:

1. `weather.location` (if added)
2. City derived from `timeZone.zone` (example: `America/Edmonton` -> `Edmonton`)
3. `contacts.location`

## Notes

- API calls are made server-side in `getServerSideProps`, so the key is not exposed to the browser.
- If weather does not appear, confirm the key is valid and active, then refresh.
