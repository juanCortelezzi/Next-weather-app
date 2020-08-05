export async function main_apicall(query) {
  const API_KEY = process.env.API_KEY;
  const main = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
  );
  const main_data = await main.json();

  return main_data;
}

export async function week_apicall(lat, lon) {
  const API_KEY = process.env.API_KEY;
  const week = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_KEY}&units=metric`
  );
  const week_data = await week.json();
  return week_data;
}
