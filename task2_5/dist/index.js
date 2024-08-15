import { today, celected, anotherDay } from "./templates.js";
const key = `5a51abcc16a4800aaab6f1a7dbf2204b`;
const input = document.querySelector(".input");
const cross = document.querySelector(".cross");
const todayEl = document.querySelector(".today");
const celectedEl = document.querySelector(".celected");
const anotherDays = document.querySelector(".another-days");
const loading = document.querySelector("#loading");
input?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (loading)
            loading.style.display = "block";
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${key}`)
            .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
            .then((data) => {
            updateWeatherInfo(data);
        })
            .catch((error) => {
            console.error("Error fetching weather data:", error);
        })
            .finally(() => {
            if (loading)
                loading.style.display = "none";
        });
    }
});
cross?.addEventListener("click", () => {
    if (input && input.value !== "") {
        input.value = "";
    }
});
const calculateDayNightTemps = (data, period) => {
    const temps = [];
    data.forEach((entry) => {
        const hour = new Date(entry.dt * 1000).getHours();
        if (period === "day" && hour >= 6 && hour < 18) {
            temps.push(entry.main.temp);
        }
        else if (period === "night" && (hour >= 18 || hour < 6)) {
            temps.push(entry.main.temp);
        }
    });
    return {
        minTemp: Math.min(...temps) - 273.15,
        maxTemp: Math.max(...temps) - 273.15,
    };
};
const groupByDay = (data) => {
    const days = [];
    let currentDay = "";
    data.forEach((entry) => {
        const entryDate = entry.dt_txt.split(" ")[0];
        if (entryDate !== currentDay) {
            currentDay = entryDate;
            days.push([]);
        }
        days[days.length - 1].push(entry);
    });
    return days;
};
const updateWeatherInfo = (data) => {
    if (celectedEl) {
        celectedEl.innerHTML = celected(data);
    }
    if (todayEl) {
        todayEl.innerHTML = today(data);
    }
    if (anotherDays) {
        const groupedData = groupByDay(data.list);
        anotherDays.innerHTML = groupedData
            .map((dayData, index) => {
            if (index === 0)
                return;
            const dayTemps = calculateDayNightTemps(dayData, "day");
            const nightTemps = calculateDayNightTemps(dayData, "night");
            return anotherDay(dayData, dayTemps, nightTemps);
        })
            .join("");
    }
};
