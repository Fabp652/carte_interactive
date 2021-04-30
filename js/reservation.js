class Reservation {
    constructor(idReservation) {
        this.reserver = document.querySelector(idReservation);
        this.validation = document.querySelector(".validation");
        this.nomPrenom = document.querySelector(".nom_prenom");
        this.nom = document.querySelector(".nom");
        this.prenom = document.querySelector('.prenom');
        this.decompte = document.querySelector(".decompte");
        this.velosReserver = document.querySelector(".velos_reserver");
        this.valider = document.querySelector(".valider");
        this.show = false;
        this.newReservation();
        this.showReservation();
        this.refreshPage();
    }

    newReservation() {
        this.nom.addEventListener('change', () => {
            localStorage.setItem('nom', this.nom.value);
            clearInterval(this.decompteSeconde);
        })

        this.prenom.addEventListener('change', () => {
            localStorage.setItem('prenom', this.prenom.value);
            clearInterval(this.decompteSeconde);
        })

        this.nomPrenom.onsubmit = (event) => {
            event.preventDefault();
        };
        this.reserver.addEventListener("click", () => {
            if (this.nom.checkValidity() == true && this.prenom.checkValidity() == true) {
                this.validation.style.display = 'flex';
            } else {
                this.validation.style.display = 'none';
            }
        });
    }

    showReservation() {
        if (typeof localStorage != 'undefined') {
            if ('nom' in localStorage) {
                this.nom.value = localStorage.getItem('nom');
            }
            if ('prenom' in localStorage) {
                this.prenom.value = localStorage.getItem('prenom');
            }
        }
        this.valider.addEventListener("click", () => {
            if (canvas.signer == true) {
                this.velosReserver.innerHTML = 'Vélo réservé à la station ' + sessionStorage.marker + ' par ' + this.nom.value + '  ' + this.prenom.value;
                this.startTimer = Date.now() / 1000;
                sessionStorage.setItem('start', this.startTimer);
                this.endTimer = this.startTimer + 1200;
                sessionStorage.setItem('end', this.endTimer);
                this.decompteSeconde = setInterval(() => {
                    this.decompteReservation()
                }, 1000);
                this.show = true;
            } else {
                this.velosReserver.innerHTML = "Veuilliez signer dans l'encadré pour valider la réservation";
            }
        })
    }

    decompteReservation() {
        this.timer = Math.floor(this.endTimer - this.startTimer);
        this.timer--;
        this.startTimer++;
        this.minute = Math.floor(this.timer / 60);
        this.seconde = ("0" + this.timer % 60).substr(-2);
        this.decompte.innerHTML = 'Temps restant : ' + this.minute + ' min ' + this.seconde + ' s';
        if (this.timer < 0 && this.startTimer > this.endTimer) {
            this.stopReservation();
        }
    }

    refreshPage() {
        window.addEventListener('load', () => {
            if (typeof sessionStorage != 'undefined') {
                if ('start' in sessionStorage) {
                    sessionStorage.removeItem('start');
                    this.startTimer = Date.now() / 1000;
                    sessionStorage.setItem('start', this.startTimer);
                }
                if ('end' in sessionStorage) {
                    this.endTimer = sessionStorage.getItem('end');
                }
            }
            if (this.endTimer - this.startTimer > 0) {
                this.velosReserver.innerHTML = 'Vélo réservé à la station ' + sessionStorage.marker + ' par ' + this.nom.value + '  ' + this.prenom.value;
                this.decompteSeconde = setInterval(() => {
                    this.decompteReservation()
                }, 1000);
            }
        })
    }

    stopReservation() {
        clearInterval(this.decompteSeconde);
        while (this.velosReserver.firstChild) {
            this.velosReserver.removeChild(this.velosReserver.firstChild);
        };
        while (this.decompte.firstChild) {
            this.decompte.removeChild(this.decompte.firstChild);
        };
        sessionStorage.clear();
    }
}