import styles from './WeatherInfo.module.css'

const WeatherInfo = ({ weatherData }) => {
  const temperatureValue = Math.round(weatherData.main.temp)
  const weatherIconURL = `${process.env.REACT_APP_WEATHER_IMAGE_BASE_URL}/${weatherData.weather[0].icon}@2x.png`
  const weatherDescription = capitalize(weatherData.weather[0].description)
  const feelsLikeValue = Math.round(weatherData.main.feels_like)
  const humidityValue = weatherData.main.humidity
  const windSpeedValue = Math.round(weatherData.wind.speed * 3.6)
  const visibilityValue = weatherData.visibility / 1000
  const cloudinessValue = weatherData.clouds.all

  const weatherParameters = transformIntoArrayOfObjects(
    feelsLikeValue,
    humidityValue,
    windSpeedValue,
    visibilityValue,
    cloudinessValue
  )

  return (
    <section className={styles.weatherInfo}>
      <div className={styles.temperature}>
        <div>
          <img
            src={weatherIconURL}
            alt={weatherDescription}
            className={styles.weatherIcon}
          />
        </div>
        <h2>
          {temperatureValue} &deg; C | {weatherDescription}
        </h2>
      </div>
      {weatherParameters.map((weatherParameter) => (
        <div key={weatherParameter.id} className={styles.weatherParameters}>
          <span className={styles.parameterTitle}>
            {weatherParameter.title}
          </span>
          <span>
            {weatherParameter.value} {weatherParameter.unit}
          </span>
        </div>
      ))}
    </section>
  )
}

export default WeatherInfo

function capitalize(stringToCapitalize) {
  return stringToCapitalize[0].toUpperCase() + stringToCapitalize.slice(1)
}

function transformIntoArrayOfObjects(
  feelsLikeValue,
  humidityValue,
  windSpeedValue,
  visibilityValue,
  cloudinessValue
) {
  return [
    { id: 0, title: 'Feels like', value: feelsLikeValue, unit: '°C' },
    { id: 1, title: 'Humidity', value: humidityValue, unit: '%' },
    { id: 2, title: 'Wind Speed', value: windSpeedValue, unit: 'KM/H' },
    { id: 3, title: 'Visibility', value: visibilityValue, unit: 'KM' },
    { id: 4, title: 'Cloudiness', value: cloudinessValue, unit: '%' },
  ]
}
