const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const alt = document.querySelector(".alt");
const velo = document.querySelector(".velo");
let firstTime = true;

//Making a map and tile
const map = L.map("map").setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

//Making a marker with a icon 
const issIcon = L.icon({
    iconUrl: 'img/iss.png',
    iconSize: [80, 55],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

//Get ISS function
async function getISS() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        
        lat.textContent = data.latitude;
        lon.textContent = data.longitude;
        alt.textContent = data.altitude;
        velo.textContent = data.velocity;

        marker.setLatLng([data.latitude, data.longitude]);
        if (firstTime) {
            map.setView([data.latitude, data.longitude], 3)
            firstTime = false;
        }
    }
    catch (e) {
        alert("The api doesn't work");
        console.log(e);
    }
}

//This setInterval updates the iss's location every 1 second
setInterval(getISS, 1000);

console.log('File loaded');