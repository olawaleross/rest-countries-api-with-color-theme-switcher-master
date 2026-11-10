const bodyEl = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle-btn");
const toggleText = document.querySelector(".toggle-text");

if (localStorage.getItem("theme") === "dark") {bodyEl.classList.add("dark");}
function applyTheme(isDark) {
  bodyEl.classList.toggle("dark", isDark);
  toggleBtn.innerHTML = isDark
    ? `<i class="fa-solid fa-sun"></i>`
    : `<i class="fa-solid fa-moon"></i>`;
  toggleText.textContent = isDark ? "Light mode" : "Dark mode";
}

// restore saved theme on load
applyTheme(localStorage.getItem("theme") === "dark");

toggleBtn.addEventListener("click", () => {
  const isDark = !bodyEl.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const detailsEl = document.querySelector(".country-details");

async function loadCountry() {
  try {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("name");

    const res = await fetch("./data.json");
    const data = await res.json();

    const item = data.find((c) => c.name === countryName);
    if (!item) {
      detailsEl.textContent = "Country not found.";
      return;
    }


   

    detailsEl.innerHTML = `
      <img src="${item.flags.png}" alt="Flag of ${item.name}" />
      <div class="details-info">
        <h1>${item.name}</h1>
        <p>Native Name: ${item.nativeName}</p>
        <p>Population: ${item.population}</p>
        <p>Region: ${item.region}</p>
        <p>Sub Region: ${item.subregion}</p>
        <p>Capital: ${item.capital}</p>
        <p>Currencies: ${(item.currencies ).map((c) => c.name).join(", ")}</p>
        <p>Languages: ${(item.languages ).map((l) => l.name).join(", ")}</p>
       
      </div>
    `;
  } catch (error) {
    console.log("Failed to load country details:", error);
  }
}

loadCountry();