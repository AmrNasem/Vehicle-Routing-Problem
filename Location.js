class Location {
  constructor(id, x, y, depot = false) {
    this.id = id.toString();
    this.x = x;
    this.y = y;
    this.depot = depot;
  }

  createLocation(ctx) {
    let radius = this.depot ? 7 : 5;

    ctx.beginPath();
    ctx.fillStyle = this.depot ? "black" : "white";
    ctx.arc(this.x * 20, this.y * 20, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  createLocationElement() {
    const location = document.createElement("div");
    location.className = "location";
    location.setAttribute("data-x", this.x);
    location.setAttribute("data-y", this.y);
    location.setAttribute("data-id", this.id);

    const li = document.createElement("li");
    li.innerHTML = `(${this.x}, ${this.y})`;

    const button = document.createElement("button");
    button.innerHTML = "Delete";

    location.append(li, button);
    return location;
  }
}
