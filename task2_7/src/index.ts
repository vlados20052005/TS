const tumbler = document.querySelector(".tumbler-wrapper")!;
const body = document.body;

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data: Country[]) => {
    const countries = listOfCountries(data);
    renderCountries(countries);

    const searchInput = document.querySelector(".input") as HTMLInputElement;
    const regionFilter = document.querySelector(
      "#region-filter"
    ) as HTMLSelectElement;

    searchInput.addEventListener("input", () => {
      filterCountries(countries);
    });

    regionFilter.addEventListener("change", () => {
      filterCountries(countries);
    });

    function filterCountries(countries: Country[]) {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedRegion = regionFilter.value;

      const filteredCountries = countries.filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(searchTerm);
        const matchesRegion =
          selectedRegion === "All" || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
      });

      renderCountries(filteredCountries);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

const listOfCountries = (data: Country[]): any[] => {
  return data.map((element) => ({
    name: element.name,
    capital: element.capital ? element.capital[0] : "N/A",
    region: element.region,
    population: element.population,
    flags: element.flags,
  }));
};

const renderCountries = (countries: Country[]) => {
  const cardsContainer = document.querySelector(".cards") as HTMLElement;
  cardsContainer.innerHTML = "";

  countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
          <img src="${country.flags.png}" alt="${
      country.name.common
    }" class="foto" />
          <div class="info">
            <div class="country">${country.name.common}</div>
            <div class="population"><b>Population:</b> ${country.population.toLocaleString()}</div>
            <div class="region"><b>Region:</b> ${country.region}</div>
            <div class="capital"><b>Capital:</b> ${country.capital}</div>
          </div>
        `;

    cardsContainer.appendChild(card);
  });
};

if (localStorage.getItem("nightMode") === "enabled") {
  body.classList.add("night-mode");
}

tumbler.addEventListener("click", () => {
  body.classList.toggle("night-mode");

  if (body.classList.contains("night-mode")) {
    localStorage.setItem("nightMode", "enabled");
  } else {
    localStorage.removeItem("nightMode");
  }
});
