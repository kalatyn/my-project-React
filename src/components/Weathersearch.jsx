import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

const WeatherSearch = () => {
  const [, setLocation] = useLocation();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState(() => {
    const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    return savedCities;
  });
  const [loading, setLoading] = useState(false);
  const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Используйте VITE_ префикс для Vite

  // Загружаем города из URL или localStorage при первой загрузке
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cityNames = params.get("cities");

    if (cityNames) {
      const cityList = cityNames.split(",");
      setLoading(true);
      Promise.all(cityList.map(fetchWeather))
        .then((results) => setCities(results.filter(Boolean)))
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    } else {
      const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
      setCities(savedCities);
    }
  }, []);

  // Обновляем localStorage и URL при изменении списка городов
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));

    if (cities.length > 0) {
      const queryParams = cities.map((c) => c.location.name).join(",");
      setLocation(`/weather?cities=${encodeURIComponent(queryParams)}`);
    } else {
      setLocation("/weather"); // Очистка URL, если список пуст
    }
  }, [cities, setLocation]);

  const fetchWeather = async (cityName) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${VITE_WEATHER_API_KEY}&q=${cityName}&aqi=no`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addCity = async () => {
    if (city.trim()) {
      setLoading(true);
      const result = await fetchWeather(city);
      if (result && result.location) {
        setCities((prevCities) => {
          const updatedCities = [...prevCities, result];
          const queryParams = updatedCities
            .map((c) => c.location.name)
            .join(",");
          setLocation(`/weather?cities=${encodeURIComponent(queryParams)}`);
          return updatedCities;
        });
      }
      setCity("");
      setLoading(false);
    }
  };

  const removeCity = (index) => {
    setCities((prevCities) => {
      const updatedCities = prevCities.filter((_, i) => i !== index);
      if (updatedCities.length === 0) {
        setLocation("/weather");
      }
      return updatedCities;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addCity();
    }
  };

  return (
    <div>
      <h3>Find weather</h3>
      <input
        className="inputTask"
        value={city}
        type="text"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="addTask" onClick={addCity}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      <div className="weather_container">
        {cities.map(
          (weather, index) =>
            weather.location &&
            weather.current && (
              <div key={index} className="weather_card">
                <h4>
                  {weather.location.name}, {weather.location.country}
                </h4>
                <p className="delete" onClick={() => removeCity(index)}>
                  ⓧ
                </p>
                <p>Current Temperature: {weather.current.temp_c}°C</p>
                <p>Condition: {weather.current.condition.text}</p>
                <p>Wind: {weather.current.wind_kph} km/h</p>
                <img
                  src={weather.current.condition.icon}
                  alt="weather condition icon"
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>Wind degree : </p>
                  <img
                    src="img/arrow-up.svg"
                    alt=" Wind degree"
                    style={{
                      transform: `rotate(${weather.current.wind_degree}deg)`,
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;
