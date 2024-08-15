export const today = (data) => {
    return `<div class="temprature-info">
            <div class="now">${(data.list[0].main.feels_like - 273.15).toFixed(2)}°C</div>
            <div class="warmest"><div>${data.list[0].weather[0].main}</div><div>${(data.list[0].main.temp - 273.15).toFixed(2)}°C</div></div>
          </div>
          <div class="weather-info">
            <div class="describe">${data.list[0].weather[0].description}</div>
            <div class="place">${data.city.name}</div>
          </div>
          <img
            class="weather-img"
            src="${`../assets/weather/${data.list[0].weather[0].main}.png`}"
            alt="${data.list[0].weather[0].main}"
          />`;
};
export const anotherDay = (dayData, dayTemps, nightTemps) => {
    const date = new Date(dayData[0].dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    return `<div class="weak-day">
              <div class="day">${dayName}</div>
              <img
                class="weather-img"
                src="./assets/weather/${dayData[0].weather[0].main}.png"
                alt="${dayData[0].weather[0].main}"
              />
              <div class="weather-state">${dayData[0].weather[0].main}</div>
              <div class="temprature-day">
                <div>Day</div>
                <div class="temprature">${dayTemps.maxTemp.toFixed(1)}°C</div>
                <div class="temprature">${nightTemps.minTemp.toFixed(1)}°C</div>
                <div>Night</div>
              </div>
            </div>`;
};
export const celected = (data) => {
    return `Celected: ${data.city.name}, ${data.city.country}`;
};
