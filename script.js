const ipContainer = document.getElementById("ip-container");
const locationContainer = document.getElementById("location-container");
const timezoneContainer = document.getElementById("timezone-container");
const ispContainer = document.getElementById("isp-container");
let map;

fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_z1xxube3Gkfnm5YyiKbUXDuPsATtU"
)
  .then((res) => res.json())
  .then((data) => {
    ipContainer.textContent = `${data.ip}`;
    locationContainer.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezoneContainer.textContent = `UTC ${data.location.timezone}`;
    ispContainer.textContent = `${data.isp}`;

    document.getElementById("alert-container").innerHTML = "";

    if (map != undefined) {
      map.remove();
    }

    map = L.map("map", {
      center: [data.location.lat, data.location.lng],
      zoom: 13,
    });
    L.marker([data.location.lat, data.location.lng]).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  })
  .catch((err) => {
    // DISPLAYS A DEFAULT MAP IF CLIENT REQUEST'S PUBLIC IP ADRESS IS NOT AVAILABLE
    var map = L.map("map", {
      center: [0, -100],
      zoom: 3,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  });

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_z1xxube3Gkfnm5YyiKbUXDuPsATtU&ipAddress=${event.target.ip.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      ipContainer.textContent = `${data.ip}`;
      locationContainer.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezoneContainer.textContent = `UTC ${data.location.timezone}`;
      ispContainer.textContent = `${data.isp}`;

      document.getElementById("alert-container").innerHTML = "";

      if (map != undefined) {
        map.remove();
      }

      map = L.map("map", {
        center: [data.location.lat, data.location.lng],
        zoom: 13,
      });
      L.marker([data.location.lat, data.location.lng]).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    })
    .catch((err) => {
      ipContainer.textContent = "-";
      locationContainer.textContent = "-";
      timezoneContainer.textContent = "-";
      ispContainer.textContent = "-";
      document.getElementById("alert-container").innerHTML = `
        <div class="alert">The IP you provided is not valid, try with another one</div>
      `;
    });
});
