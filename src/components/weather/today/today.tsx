import { useState, useEffect, useContext, FC, useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";
import classNames from "classnames";
import mockData from "../../../assets/data";
import { DataContext, SettingsContext } from "../../../providers";
import { Scale } from "../../../types";
import { mapBoxMapper, WeatherNow } from "../../../utils";
import "./today.scss";

interface Props {
  weatherData: WeatherNow;
}

const messages = defineMessages({
  componentsWeatherTodayWindSpeed: {
    id: "componentsWeatherTodayWindSpeed",
    defaultMessage: "Wind speed: {speed} mph",
  },
  componentsWeatherTodayFeelsLike: {
    id: "componentsWeatherTodayFeelsLike",
    defaultMessage: "Feels like: {temperature}",
  },
  componentsWeatherTodayHumidity: {
    id: "componentsWeatherTodayHumidity",
    defaultMessage: "Humidity: {humidity}",
  },
});

const Today: FC<Props> = ({ weatherData }) => {
  const { description, speed, feel, humidity, temp, img } = weatherData;
  const { data } = useContext(DataContext);
  const { scale, language } = useContext(SettingsContext);
  const intl = useIntl();
  const location = useMemo(() => mapBoxMapper(data?.mapBoxData), [data?.mapBoxData]);

  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
      });

      return () => clearTimeout(timeout);
    }, 1000);
  }, [time]);

  return (
    <div className="today">
      <div className="location">
        <p className="country">{location.country}</p>
        <p className="place">{location.place}</p>
      </div>

      <div className="date">
        <span>
          {mockData.days[language][new Date().getDay()]} &nbsp;
          {mockData.months[language][new Date().getMonth()]} &nbsp;
          {new Date().getDate()} &nbsp;
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="time">
        <div className="old">
          {time.hours.toString().length === 1 ? `0${time.hours}` : `${time.hours}`}:
          {time.minutes.toString().length === 1 ? `0${time.minutes}` : `${time.minutes}`}:
          {time.seconds.toString().length === 1 ? `0${time.seconds}` : `${time.seconds}`}
        </div>
      </div>

      <div className="about">
        <div className="about-weather">
          <span>{description}</span>
        </div>
        <div className={classNames("about-icon", img)}></div>
      </div>

      <div className="parameters">
        <div className="temperature">
          {scale === Scale.FAR ? (
            <div>
              <span>{(temp * 1.8 + 32).toFixed()}</span>
              <span>°F</span>
            </div>
          ) : (
            <div>
              <span>{(temp / 1).toFixed()}</span>
              <span>°C</span>
            </div>
          )}
        </div>

        <div className="details">
          <div className="speed">
            {intl.formatMessage(messages.componentsWeatherTodayWindSpeed, {
              speed,
            })}
          </div>

          <div className="feel">
            {intl.formatMessage(messages.componentsWeatherTodayFeelsLike, {
              temperature:
                scale === Scale.CEL
                  ? `${(feel / 1).toFixed()} °C`
                  : `${((feel / 1) * 1.8 + 32).toFixed()} °F`,
            })}
          </div>

          <div className="humidity">
            <span>{intl.formatMessage(messages.componentsWeatherTodayHumidity, { humidity })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
