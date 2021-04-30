class Canvas {
    constructor() {
        this.clear = document.querySelector(".btn-clear")
        this.signature = document.querySelector("#signature");
        this.context = this.signature.getContext("2d");
        this.context.strokeStyle = '#000';
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.trait = false;
        this.signer = false;
        this.lastX = 0;
        this.lastY = 0;
        this.addEvent();
    }

    addEvent() {
        this.signature.addEventListener("mousemove", (event) => {
            this.tracer(event)
        });
        this.signature.addEventListener("mousedown", (event) => {
            this.eventTrait(event)
        });
        this.signature.addEventListener("mouseup", () => {
            this.trait = false
        });
        this.signature.addEventListener("mouseout", () => {
            this.trait = false
        });
        this.signature.addEventListener("touchmove", (event) => {
            this.tracerTactile(event)
        });
        this.signature.addEventListener("touchstart", (event) => {
            this.toucheTarget(event)
        });
        this.signature.addEventListener("touchend", () => {
            this.trait = false
        });
        this.clear.addEventListener("click", () => {
            this.clearSignature()
        })
    }

    eventTrait(event) {
        this.trait = true;
        [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    }

    tracer(event) {
        if (!this.trait) {
            return;
        }
        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
        this.context.lineTo(event.offsetX, event.offsetY);
        this.context.stroke();
        [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
        this.signer = true;
    }

    toucheTarget(event) {
        this.signatureRect = this.signature.getBoundingClientRect();
        for (this.i = 0; this.i < event.changedTouches.length; this.i++) {
            this.posX = (event.changedTouches[this.i].pageX - this.signatureRect.left) / (this.signatureRect.right - this.signatureRect.left) * this.signatureRect.width;
            this.posY = (event.changedTouches[this.i].pageY - this.signatureRect.top) / (this.signatureRect.bottom - this.signatureRect.top) * this.signatureRect.height;
            [this.lastX, this.lastY] = [this.posX, this.posY];
        }
        this.trait = true;
    }

    tracerTactile(event) {
        if (!this.trait) {
            return;
        }

        for (this.i = 0; this.i < event.changedTouches.length; this.i++) {
            this.posX = (event.changedTouches[this.i].pageX - this.signatureRect.left) / (this.signatureRect.right - this.signatureRect.left) * this.signatureRect.width;
            this.posY = (event.changedTouches[this.i].pageY - this.signatureRect.top) / (this.signatureRect.bottom - this.signatureRect.top) * this.signatureRect.height;
            this.context.beginPath();
            this.context.moveTo(this.lastX, this.lastY);
            this.context.lineTo(this.posX, this.posY);
            this.context.stroke();
            [this.lastX, this.lastY] = [this.posX, this.posY];
        }
        this.signer = true;
    }

    clearSignature() {
        this.context.clearRect(0, 0, this.signature.clientWidth, this.signature.height);
        if (reservation.show == true) {
            reservation.velosReserver.innerHTML = "Veuilliez signer dans l'encadré pour valider la réservation";
            clearInterval(reservation.decompteSeconde);
            while (reservation.decompte.firstChild) {
                reservation.decompte.removeChild(reservation.decompte.firstChild);
                reservation.timer = 1200;
            }
        }
        this.signer = false;
    }
}