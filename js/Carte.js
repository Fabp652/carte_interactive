class Carte {
    constructor() {
        this.lat = 45.750000;
        this.long = 4.850000;
        this.maCarte = null;
        this.load();
        ajax(APIURL, (stations) => {
            for (let station in stations) {
                let marker = L.marker([stations[station].position.latitude, stations[station].position.longitude]).addTo(this.maCarte);
                let panneau = document.querySelector(".panneau");
                let information = document.querySelector(".information");
                let indisponnible = document.querySelector(".velosindisponnible");
                let etats;
                if (stations[station].status == "OPEN") {
                    etats = "Ouverte";
                } else if (stations[station].status == "CLOSED") {
                    etats = "Fermée";
                }
                marker.addEventListener('click', () => {
                    reservation.stopReservation();
                    sessionStorage.marker = stations[station].address;
                    panneau.style.display = 'block';
                    if (stations[station].totalStands.availabilities.bikes === 0) {
                        indisponnible.style.zIndex = 2;
                        indisponnible.textContent = "Désolé il n'y a plus de vélos disponible à cette station";
                    } else if (stations[station].status == "CLOSED"){
                        indisponnible.style.zIndex = 2;
                        indisponnible.textContent = "Désolé la station est fermée";
                    }
                    else {
                        indisponnible.style.zIndex = -1;
                    }
                    information.innerHTML = '<h2>Détails de la station</h2> <ul><li>Adresse : ' + stations[station].address + '</li><li>Etat de la station : ' + etats + '</li><li>' + stations[station].totalStands.availabilities.stands + ' place(s)</li><li>' + stations[station].totalStands.availabilities.bikes + ' vélo(s) disponible(s)</li></ul>';
                });
            }
        })
    }

    initMap() {
        this.maCarte = L.map('map').setView([this.lat, this.long], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - Tiles courtesy of <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.maCarte);

    }

    load() {
        window.onload = () => {
            this.initMap();
        }
    }
}