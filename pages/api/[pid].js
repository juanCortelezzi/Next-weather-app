import validate from "../../components/validate";
import { main_apicall, week_apicall } from "../../components/apicall";
import { dateBuilder, timeBuilder } from "../../components/helpers";

export default async (req, res) => {
  const valid = validate(req.query.pid, true);

  if (!valid.valid)
    return res.status(404).send(
      `
--------------------------------------------------------------------------------

  Get The Teather In Your Terminal !!

  curl https://nextweatherapp.herokuapp.com/api/(city)

  Or Indicate The Desired Country For Better Precision Using

  curl https://nextweatherapp.herokuapp.com/api/(city),(two letter country code)

--------------------------------------------------------------------------------

  if the city name has two or more words, separate them via a "-"

--------------------------------------------------------------------------------

  examples:
  1) https://nextweatherapp.herokuapp.com/api/christchurch,nz
  2) https://nextweatherapp.herokuapp.com/api/buenos-aires,ar
  3) https://nextweatherapp.herokuapp.com/api/Auckland
  4) https://nextweatherapp.herokuapp.com/api/new-york

--------------------------------------------------------------------------------

`
    );

  const weatherData = await main_apicall(valid.query);

  if (weatherData.cod !== 200)
    return res.status(400).send(
      `
--------------------------------------------------------------------------------

  curl https://nextweatherapp.herokuapp.com/api/(city)
  
  Or Indicate The Desired Country For Better Precision Using
  
  curl https://nextweatherapp.herokuapp.com/api/(city),(two letter country code)

--------------------------------------------------------------------------------

  **** Server Error ****

  "curl https://nextweatherapp.herokuapp.com/api/${valid.query}"
  
  May Not A Valid Country Or City.
  
  please look if the two letter country code is valid, or if the
  city name is correctly spelled.

  if any doubts, please make a quick search in google maps for 
  the city name (or any other site), or search for two letter country
  code for your desired country

--------------------------------------------------------------------------------

  if the city name has two or more words, separate them via a "-"

  examples:
  1) https://nextweatherapp.herokuapp.com/api/christchurch,nz
  2) https://nextweatherapp.herokuapp.com/api/buenos-aires,ar
  3) https://nextweatherapp.herokuapp.com/api/Auckland
  4) https://nextweatherapp.herokuapp.com/api/new-york

--------------------------------------------------------------------------------

`
    );

  const { dt, main, name, weather, wind, coord, sys, timezone } = weatherData;

  const { feels_like, temp, temp_max, temp_min, pressure, humidity } = main;
  const { icon, description } = weather[0];
  const { speed } = wind;
  const { country, sunrise, sunset } = sys;

  const weather_icon = (icon_number) => {
    const main_weather_templates = [
      `
  --- ${description} ---

    \\   /         Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
     .-.          Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  - (   ) -       Wind-speed ${speed} km/h
     \`-'          Humidity ${humidity}% | Pressure ${pressure} HPA
    /   \\         Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

   .       
     .-.  *       Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
    (:::)         Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  .  \`-'          Wind-speed ${speed} km/h
        +         Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}

`,
      `
  --- ${description} ---

    \\  /          Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
  _ /"".-.        Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
    \\_(   ).      Wind-speed ${speed} km/h
    /(___(__)     Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

        *  +      Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
    /;;.-.  .     Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
    \\:(   ).      Wind-speed ${speed} km/h
  *  (___(__)     Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

      .--.        Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
   .-(    ).      Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  (___.__)__)     Wind-speed ${speed} km/h
                  Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

    .-. .-.       Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
   (   ).  )-.    Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  (___(__)____)   Wind-speed ${speed} km/h
                  Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

    .-.           Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
   (   ).         Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  (___(__)        Wind-speed ${speed} km/h
   ' ' ' '        Humidity ${humidity}% | Pressure ${pressure} HPA
  ' ' ' '         Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

  _\`/"".-.        Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
   ,\\_(   ).      Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
    /(___(__)     Wind-speed ${speed} km/h
      ' ' ' '     Humidity ${humidity}% | Pressure ${pressure} HPA
     ' ' ' '      Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

   /;;.-.  *      Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
   \\:(   ).       Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
   +(___(__)      Wind-speed ${speed} km/h
     ' ' ' '      Humidity ${humidity}% | Pressure ${pressure} HPA
  * ' ' ' '       Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

     .-.          Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
    (   ).        Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
   (___(__)       Wind-speed ${speed} km/h
  ,',_//,'        Humidity ${humidity}% | Pressure ${pressure} HPA
  ,'//\\\\,'        Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )} 
`,
      `
  --- ${description} ---

  __/\\__          Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
  \\_\\/_/          Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
  /_/\\_\\          Wind-speed ${speed} km/h
    \\/            Humidity ${humidity}% | Pressure ${pressure} HPA                  
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
  --- ${description} ---

   _-"- __        Temp ${Math.round(temp)} \*C | Real Feel ${Math.round(feels_like)} \*C
  _'_-_" -        Min-Max ${Math.round(temp_min)}/${Math.round(temp_max)} \*C
   "-__--'        Wind-speed ${speed} km/h
   "---- "        Humidity ${humidity}% | Pressure ${pressure} HPA
                  Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `No logo here, sorry ... :(`,
    ];

    switch (icon_number) {
      case "01d" /*clear day*/:
        return main_weather_templates[0];
      case "01n" /*clear night*/:
        return main_weather_templates[1];
      case "02d" /*few clouds day*/:
        return main_weather_templates[2];
      case "02n" /*few clouds night*/:
        return main_weather_templates[3];
      case "03n" /*cloudy*/:
      case "03d" /*cloudy*/:
        return main_weather_templates[4];
      case "04n" /*broken clouds*/:
      case "04d" /*broken clouds*/:
        return main_weather_templates[5];
      case "09n" /*shower*/:
      case "09d" /*shower*/:
        return main_weather_templates[6];
      case "10d" /*rain day*/:
        return main_weather_templates[7];
      case "10n" /*rain night*/:
        return main_weather_templates[8];
      case "11n" /*thunderstorm*/:
      case "11d" /*thunderstorm*/:
        return main_weather_templates[9];
      case "13n" /*snow*/:
      case "13d" /*snow*/:
        return main_weather_templates[10];
      case "50n" /*mist*/:
      case "50d" /*mist*/:
        return main_weather_templates[11];
      default:
        return main_weather_templates[12];
    }
  };

  const weekWeatherData = await week_apicall(coord.lat, coord.lon);

  const week_weather_templater = (data) => {
    const { dt, sunrise, sunset, temp, feels_like, pressure, humidity, wind_speed, weather } = data;

    const week_weather_templates = [
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
    \\   /          Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
     .-.           Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  - (   ) -        Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
     \`-'           Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
    /   \\          Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA 
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
   .               Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
     .-.  *        Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
    (:::)          Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
  .  \`-'           Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
        +          Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
    \\  /           Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
  _ /"".-.         Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
    \\_(   ).       Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
    /(___(__)      Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
        *  +       Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
    /;;.-.  .      Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
    \\:(   ).       Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
  *  (___(__)      Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
      .--.         Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
   .-(    ).       Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  (___.__)__)      Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
                   Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
    .-. .-.        Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
   (   ).  )-.     Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  (___(__)____)    Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
                   Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
    .-.            Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
   (   ).          Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  (___(__)         Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
   ' ' ' '         Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
  ' ' ' '          Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
  _\`/"".-.         Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
   ,\\_(   ).       Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
    /(___(__)      Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
      ' ' ' '      Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
     ' ' ' '       Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
  /;;.-.  *        Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
  \\:(   ).         Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  +(___(__)        Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
    ' ' ' '        Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
  *' ' ' '         Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
     .-.           Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
    (   ).         Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
   (___(__)        Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
  ,',_//,'         Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
  ,'//\\\\,'         Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
  __/\\__           Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
  \\_\\/_/           Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
  /_/\\_\\           Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
    \\/             Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `
    --- ${dateBuilder(dt, timezone)} ---
    --- ${weather[0].description} ---

                   Min-Max ${Math.round(temp.min)}/${Math.round(temp.max)} \*C
   _-"- __         Morning ${Math.round(temp.morn)} <=> ${Math.round(feels_like.morn)} \*C
  _'_-_" -         Day ${Math.round(temp.day)} <=> ${Math.round(feels_like.day)} \*C
   "-__--'         Eve ${Math.round(temp.eve)} <=> ${Math.round(feels_like.eve)} \*C
   "---- "         Night ${Math.round(temp.night)} <=> ${Math.round(feels_like.night)} \*C
                   Wind-speed ${Math.round(wind_speed)} Km/h
                   Humidity ${humidity}% | Pressure ${pressure} HPA
                   Sunrise ${timeBuilder(sunrise, timezone)} | Sunset ${timeBuilder(
        sunset,
        timezone
      )}
`,
      `No logo here, sorry ... :(`,
    ];

    switch (weather[0].icon) {
      case "01d" /*clear day*/:
        return week_weather_templates[0];
      case "01n" /*clear night*/:
        return week_weather_templates[1];
      case "02d" /*few clouds day*/:
        return week_weather_templates[2];
      case "02n" /*few clouds night*/:
        return week_weather_templates[3];
      case "03n" /*cloudy*/:
      case "03d" /*cloudy*/:
        return week_weather_templates[4];
      case "04n" /*broken clouds*/:
      case "04d" /*broken clouds*/:
        return week_weather_templates[5];
      case "09n" /*shower*/:
      case "09d" /*shower*/:
        return week_weather_templates[6];
      case "10d" /*rain day*/:
        return week_weather_templates[7];
      case "10n" /*rain night*/:
        return week_weather_templates[8];
      case "11n" /*thunderstorm*/:
      case "11d" /*thunderstorm*/:
        return week_weather_templates[9];
      case "13n" /*snow*/:
      case "13d" /*snow*/:
        return week_weather_templates[10];
      case "50n" /*mist*/:
      case "50d" /*mist*/:
        return week_weather_templates[11];
      default:
        return week_weather_templates[12];
    }
  };

  const formated_data = weekWeatherData.daily.map((day) => {
    return week_weather_templater(day);
  });

  res.status(200).send(
    `
--------------------------------------------------------------------------------

  curl https://nextweatherapp.herokuapp.com/api/(city)

  curl https://nextweatherapp.herokuapp.com/api/(city),(two letter country code)

--------------------------------------------------------------------------------

  You Used: curl https://nextweatherapp.herokuapp.com/api/${valid.query}

--------------------------------------------------------------------------------

  --- ${name}, ${country} ---
  --- ${dateBuilder(dt, timezone)} ---
  --- Local-time ${timeBuilder(dt, timezone)} ---

  ${weather_icon(icon)}

--------------------------------------------------------------------------------

  ${formated_data[0]}  

  ${formated_data[1]}  
  
  ${formated_data[2]}  
  
  ${formated_data[3]}  
  
  ${formated_data[4]}  
  
  ${formated_data[5]}  
  
  ${formated_data[6]}  
  
  ${formated_data[7]}  
  
--------------------------------------------------------------------------------

`
  );
};
