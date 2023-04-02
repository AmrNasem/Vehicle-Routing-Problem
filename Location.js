class Location {
  constructor(x, y, depot = false) {
    this.id = Math.random().toString();
    this.x = x;
    this.y = y;
    this.depot = depot;
    this.domElement = null;
  }

  createLocation(ctx) {
    // Canvas Location
    let radius = this.depot ? 7 : 5;

    ctx.beginPath();
    ctx.fillStyle = this.depot ? "black" : "white";
    ctx.arc(this.x * 20, this.y * 20, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // DOM Location
    const location = document.createElement("div");
    location.className = "location";
    this.depot
      ? location.classList.add("depot")
      : location.classList.remove("depot");

    location.setAttribute("data-x", this.x);
    location.setAttribute("data-y", this.y);
    location.setAttribute("data-id", this.id);

    const li = document.createElement("li");
    li.innerHTML = `(${this.x}, ${this.y})`;

    const span = document.createElement("span");
    if (this.depot) span.innerHTML = "Depot";

    const button = document.createElement("button");
    button.innerHTML = "Delete";

    location.append(li, span, button);
    this.domElement = location;

    return location;
  }
}
