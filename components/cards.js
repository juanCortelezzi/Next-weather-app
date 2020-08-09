import { timeBuilder } from "./helpers";
import { dateBuilder } from "./helpers";

export const MainCard = ({ data }) => {
  const { weather, main, dt, sys, name, wind, timezone } = data;

  let hot_background;
  if (Math.round(main.temp) >= 23) {
    hot_background = true;
  } else {
    hot_background = false;
  }

  return (
    <div className="flexcontainer">
      {hot_background ? (
        <style jsx global>{`
          #__next {
            background: #333333 url(/images/hot-desert.svg) no-repeat;
            background-position: center;
            background-size: cover;
            background-attachment: fixed;
            background-origin: border-box;
          }
        `}</style>
      ) : (
        ``
      )}
      <div className="main_card">
        <div className="main_card__header">
          <h1 className="main_card__header__location">
            {name}, {sys.country}
          </h1>
          <h2 className="main_card__header__date">
            <b>
              {dateBuilder(dt, timezone)} | {timeBuilder(dt, timezone)}
            </b>
          </h2>
        </div>
        <div className="main_card__flexcontainer">
          <div className="main_card__flexcontainer__logo">
            <img
              className="main_card__logo"
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
              alt="weather_logo"
            />
          </div>
          <div className="main_card__flexcontainer__data">
            <h3 className="main_card__description">
              {weather[0].description} {Math.round(main.temp)}°C
            </h3>
            <div className="main_card__minordata">
              <p className="main_card__minordata__realfeel">
                Real Feel {Math.round(main.feels_like)}°C
              </p>
              <p className="main_card__minordata__minmax">
                Min-Max {Math.round(main.temp_min)} / {Math.round(main.temp_max)}°C
              </p>
              <p className="main_card__minordata__windspeed">
                Wind speed {Math.round(wind.speed)} km/h
              </p>
              <p className="main_card__minordata__pressure">
                Pressure {Math.round(main.pressure)} hpa
              </p>
              <p className="main_card__minordata__humidity">Humidity {Math.round(main.humidity)}</p>
            </div>
            <p className="main_card__sunrisesunset">
              Sunrise {timeBuilder(sys.sunrise, timezone)} | Sunset{" "}
              {timeBuilder(sys.sunset, timezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WeekCard = ({ data, alldata }) => {
  const { timezone_offset } = alldata;
  const { dt, weather, sunrise, sunset, temp, feels_like, pressure, humidity, wind_speed } = data;
  const { description, icon } = weather[0];
  const { morn, day, eve, night, min, max } = temp;

  return (
    <>
      <div className="flexcontainer">
        <div className="week_card">
          <div className="week_card__header">
            <h1 className="week_card__header__date">
              <b>{dateBuilder(dt, timezone_offset)}</b>
            </h1>
          </div>

          <div className="week_card__flexcontainer">
            <div className="week_card__flexcontainer__logo">
              <img
                className="week_card__logo"
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt="weather_logo"
              />
            </div>

            <div className="week_card__flexcontainer__data">
              <h2>{description}</h2>
              <p>
                Morning {Math.round(morn)} Real Feel {Math.round(feels_like.morn)}°C
              </p>
              <p>
                Day {Math.round(day)} Real Feel {Math.round(feels_like.day)}°C
              </p>
              <p>
                Eve {Math.round(eve)} Real Feel {Math.round(feels_like.eve)}°C
              </p>
              <p>
                Night {Math.round(night)} Real Feel {Math.round(feels_like.night)}°C
              </p>
              <p>
                Min-max {Math.round(min)} / {Math.round(max)}°C
              </p>
              <p>Wind speed {Math.round(wind_speed)} Km/h</p>
              <p>Pressure {Math.round(pressure)} hpa</p>
              <p>Humidity {Math.round(humidity)}</p>
              <p>
                Sunrise {timeBuilder(sunrise, timezone_offset)} | Sunset{" "}
                {timeBuilder(sunset, timezone_offset)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
