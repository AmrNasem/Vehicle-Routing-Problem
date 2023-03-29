// Graph Variables
const myCanvas = document.getElementById("my-canvas");
const ctx = myCanvas.getContext("2d");
const height = myCanvas.height;
const width = myCanvas.width;

// DOM Variables
const form = document.querySelector(".container section form");
const x = document.getElementById("x-coordinate");
const y = document.getElementById("y-coordinate");
const locationElements = document.querySelector(
  ".container section .locations"
);
let locations = [];

// Add Location
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (x.value.trim() === "" || y.value.trim() === "") return;

  for (let i = 0; i < locations.length; i++) {
    if (locations[i].x === x.value && locations[i].y === y.value) return;
  }
  const location = new Location(Math.random(), x.value, y.value);
  locations.push(location);
  location.createLocation();
  locationElements.prepend(location.createLocationElement());
  x.value = y.value = "";
  x.focus();
});

// Remove Location
locationElements.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  locations = locations.filter(
    (location) => location.id !== e.target.parentElement.dataset.id
  );

  draw();
  e.target.parentElement.remove();
});

// Generate Locations
let init = true;
for (let i = 0; i < 15; i++) {
  const location = new Location(
    i,
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 20),
    init
  );
  init = false;
  locations.push(location);
  location.createLocation(ctx);
  locationElements.prepend(location.createLocationElement());
}
// ====================== Graph ================================

const draw = () => {
  ctx.clearRect(0, 0, width, height);

  locationElements.replaceChildren("");
  locations.map((location) => {
    location.createLocation(ctx);
    locationElements.prepend(location.createLocationElement());
  });
};

draw();
