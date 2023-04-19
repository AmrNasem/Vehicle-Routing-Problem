// Graph Variables
const myCanvas = document.getElementById("my-canvas");
const ctx = myCanvas.getContext("2d");
const height = myCanvas.height;
const width = myCanvas.width;

// ====================== Reset ================================
const reset = () => {
  ctx.clearRect(0, 0, width, height);

  locationElements.replaceChildren("");
  locations.forEach((location) => {
    // Set another depot instead of the removed one
    if (init) {
      location.depot = true;
      init = false;
    }
    locationElements.prepend(location.createLocation());
  });
};

// DOM Variables
const form = document.querySelector(".container section form");
const x = document.getElementById("x-coordinate");
const y = document.getElementById("y-coordinate");
const locationElements = document.querySelector(
  ".container section .locations"
);
const vehicles = document.getElementById("vehicles");
const solve = document.querySelector(".solutions button");

let locations = [];

// Set the depot
const setDepot = (e) => {
  if (e.target.classList.contains("location")) {
    locations.forEach((location) => (location.depot = false));

    locations.find((location) => location.id === e.target.id).depot = true;
    reset();
  }
};

// Add Location
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (x.value === "" || y.value === "") return;

  for (let i = 0; i < locations.length; i++)
    if (locations[i].x === x.value && locations[i].y === y.value) return;

  const location = new Location(x.value, y.value);
  locationElements.prepend(location.createLocation());
  locations.push(location);

  x.value = y.value = "";
  x.focus();
});

// Remove Location
const removeLocation = (e) => {
  if (e.target.tagName === "BUTTON") {
    locations = locations.filter((location) => {
      if (location.id !== e.target.parentElement.id) {
        return true;
      }
      if (location.depot) init = true;
      return false;
    });
    reset();
  }
};

// Generate Locations
let init = true;
for (let i = 0; i < 20; i++) {
  const location = new Location(
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 20),
    init
  );
  init = false;
  const existing = locations.find(
    (eLocation) => eLocation.x === location.x && eLocation.y === location.y
  );

  // Remove unnecessary duplicates
  if (existing) {
    i--;
    continue;
  }
  locationElements.prepend(location.createLocation());
  locations.push(location);
}
// Draw route
const drawRoute = (coSolutions) => {
  for (let i = 0; i < coSolutions.length; i++) {
    const solution = coSolutions[i].genes;
    const color = colors[i % colors.length];
    for (let j = 1; j < solution.length; j++) {
      const from = solution[j - 1];
      const to = solution[j];
      solution[0].createLocation(color);
      to.createLocation(color);
      ctx.beginPath();
      ctx.moveTo(from.x * 20, from.y * 20);
      ctx.lineTo(to.x * 20, to.y * 20);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    }
  }
};
// Some colors for multiple vehicles
const colors = [
  "#FF5733",
  "#F8C471",
  "#1ABC9C",
  "#1E8449",
  "#85C1E9",
  "#3498DB",
  "#E74C3C",
  "#8E44AD",
  "#34495E",
  "#EC7063",
  "#A569BD",
  "#16A085",
  "#F39C12",
  "#2C3E50",
  "#D7BDE2",
  "#FF00FF",
  "#800080",
  "#FFFF00",
  "#00FFFF",
  "#008080",
];
// Solve VRP using Genetic Algorithm
solve.addEventListener("click", () => {
  let solutions = [];
  let depot;
  const locationsNoDepot = locations.filter((location) => {
    if (location.depot) depot = location;
    return !location.depot;
  });
  // Divide locations for the given vehicles
  for (let i = 0; i < vehicles.value; i++) {
    const range = Math.floor(locationsNoDepot.length / vehicles.value);
    let = pool = locationsNoDepot.slice(range * i, (i + 1) * range);
    if (i + 1 == vehicles.value) {
      pool = locationsNoDepot.slice(range * i);
    }
    ga = new GA(pool, depot, 1, 1, 1000, 100);
    solutions.push(ga.go());
  }
  // Draw routes
  for (let i = 0; i < solutions[0].length; i++) {
    let coSolutions = [];
    for (let j = 0; j < solutions.length; j++) {
      coSolutions.push(solutions[j][i]);
    }
    setTimeout(() => {
      reset();
      drawRoute(coSolutions);
    }, 1);
  }
});
