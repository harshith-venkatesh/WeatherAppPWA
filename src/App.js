import React, { useState } from "react";
import { fetchWeather } from "./api/fetchData";
import sunrise from "./Assets/sunrise.png";
import sunset from "./Assets/sunset.png";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import "./App.css";
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const place = query;
      const data = await fetchWeather(query);
      localStorage.setItem("place", JSON.stringify(place));
      setWeather(data);
      setQuery("");
    }
  };
  var localData = localStorage.getItem("place");

  React.useEffect(() => {
    if (localData !== "null") {
      const fetch = async () => {
        const data = await fetchWeather(JSON.parse(localData));
        setWeather(data);
        setQuery("");
      };
      fetch();
    }
  });

  //   const handlePlace = async (value) => {};
  return (
    <React.Fragment>
      <div className="main-container">
        {/* <PlacesAutocomplete
          value={query}
          onChange={setQuery}
          onSelect={handlePlace}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                type="text"
                className="search"
                {...getInputProps({ placeholder: "Search...." })}
                id="searchTerm"
                // onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
              />
              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  return <div>{suggestion.description}</div>;
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
        <input
          type="text"
          className="search"
          placeholder="Search City...."
          id="searchTerm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />

        {weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name} </span>
              <sup>{weather.sys.country} </sup>
            </h2>
            <div className="city-temp">
              <span>{Math.round(weather.main.temp - 273.15)}</span>
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
            <div>
              <div style={{ display: "inline-block", float: "left" }}>
                <img
                  className="city-icon-time"
                  src={sunrise}
                  alt={weather.weather[0].description}
                />

                <p className="p-fontStyle">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "en-US"
                  )}
                </p>
              </div>
              <div
                style={{
                  display: "inline-block",
                  float: "left",
                  marginLeft: "15px",
                }}
              >
                <img
                  className="city-icon-time"
                  src={sunset}
                  alt={weather.weather[0].description}
                />

                <p className="p-fontStyle">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "en-US"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
