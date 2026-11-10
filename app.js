const bodyEl = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle-btn");
const toggleText = document.querySelector(".toggle-text");
const cardDiv = document.querySelector(".card-div");
const regionSelect = document.querySelector("#region");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const itemDiv = document.querySelector(".item-div");
let countryData = [];
function applyTheme(isDark) {
  bodyEl.classList.toggle("dark", isDark);
  toggleBtn.innerHTML = isDark
    ? `<i class="fa-solid fa-sun"></i>`
    : `<i class="fa-solid fa-moon"></i>`;
  toggleText.textContent = isDark ? "Light mode" : "Dark mode";
}

applyTheme(localStorage.getItem("theme") === "dark");

toggleBtn.addEventListener("click", () => {
  const isDark = !bodyEl.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

async function showCountry() {
  
  try {
    const res = await fetch("./data.json");
    const data = await res.json();

    showItem(data);
    getRegion(data);
    countryData = data;
  } catch (error) {
    console.log(error);
  }
}

showCountry();

function showItem(data) {
  console.log(data);
  cardDiv.textContent = "";
  data.map((item) => {
    const itemDiv = document.createElement("div");
    const itemBottomDiv = document.createElement("div");
    const itemInnerDiv = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h2");
    const population = document.createElement("p");
    const region = document.createElement("p");
    const capital = document.createElement("p");
    image.src = item.flags.png;
    name.textContent = item.name;
    population.textContent = `Population : ${item.population}`;
    region.textContent = `Region : ${item.region}`;
    capital.textContent = `Capital : ${item.capital}`;
    itemDiv.className = "item-div";
    itemBottomDiv.className = "item-bottom-div";
    itemInnerDiv.append(population, region, capital);
    itemBottomDiv.append(name, itemInnerDiv);
    itemDiv.append(image, itemBottomDiv);
    cardDiv.append(itemDiv);

    itemDiv.addEventListener("click", () => {
  window.location.href = `details.html?name=${encodeURIComponent(item.name)}`;
});
    
  });
}

function getRegion(data) {
  //   regionSelect.textContent=""
  const nonDuplicate = [...new Set(data.map((item) => item.region))];

  nonDuplicate.map((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    regionSelect.append(option);
  });
}

regionSelect.addEventListener("change", (e) => {
  const selectedRegion = e.target.value;
  const filteredCountries =
    selectedRegion === "All Region"
      ? countryData
      : countryData.filter((item) => item.region === selectedRegion);
  showItem(filteredCountries);
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputEl.addEventListener("change", (e) => {
  const inputRegion = e.target.value;
  const filteredCountries = countryData.filter(
    (item) => item.name.toLowerCase() === inputRegion,
  );
  showItem(filteredCountries);
});

inputEl.addEventListener("input", (e) => {
  const inputRegion = e.target.value;
  const filteredCountries = countryData.filter((item) =>
    item.name.toLowerCase().includes(inputRegion),
  );
  showItem(filteredCountries);
});


window.addEventListener( "pageshow",(e)=>{
 if(e.persisted){
   window.location.reload()
 }
 
})


