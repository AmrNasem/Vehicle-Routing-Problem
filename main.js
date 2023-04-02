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
    locationElements.prepend(location.createLocation(ctx));
    location.domElement.addEventListener("click", setDepot);
    location.domElement.addEventListener("click", removeLocation);
  });
};

// DOM Variables
const form = document.querySelector(".container section form");
const x = document.getElementById("x-coordinate");
const y = document.getElementById("y-coordinate");
const locationElements = document.querySelector(
  ".container section .locations"
);

let locations = [];

// Set the depot
const setDepot = (e) => {
  if (e.target.classList.contains("location")) {
    locations.forEach((location) => (location.depot = false));

    locations.find(
      (location) => location.id === e.target.dataset.id
    ).depot = true;
    reset();
  }
};

// Add Location
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (x.value === "" || y.value === "") return;

  for (let i = 0; i < locations.length; i++) {
    if (locations[i].x === x.value && locations[i].y === y.value) return;
  }
  const location = new Location(x.value, y.value);
  locations.push(location);
  location.createLocation(ctx);
  reset();

  x.value = y.value = "";
  x.focus();
});

// Remove Location
const removeLocation = (e) => {
  if (e.target.tagName === "BUTTON") {
    locations = locations.filter((location) => {
      if (location.id !== e.target.parentElement.dataset.id) {
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
for (let i = 0; i < 15; i++) {
  const location = new Location(
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 20),
    init
  );
  init = false;
  location.createLocation(ctx);
  locations.push(location);
}

// Reset Canvas
reset();
