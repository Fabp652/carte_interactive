class Diaporama {
    constructor() {
        this.image = document.querySelector("#image");
        this.stop = document.querySelector("#stop");
        this.play = document.querySelector("#play");
        this.resume = document.querySelector("#resume");
        this.previous = document.querySelector("#previous");
        this.next = document.querySelector("#next");
        this.myImages = ["images/carte.png", "images/panneau.png", "images/signature.png", "images/reservation.png"];
        this.imageNum = 0;
        this.spaceBarPressed = false;
        this.run();
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                this.nextImage();
            } else if (event.key === "ArrowLeft") {
                this.previousImage();
            } else if (event.code === "Space" && this.spaceBarPressed === false) {
                this.spaceBarPressed = true;
                this.stopDiaporama();
            } else if (event.code === "Space" && this.spaceBarPressed === true) {
                this.spaceBarPressed = false;
                this.run();
            }
        });
        this.addEvent();
    }

    addEvent() {
        this.stop.addEventListener("click", () => {
            this.stopDiaporama();
            this.spaceBarPressed = true;
        });
        this.play.addEventListener("click", () => {
            this.run();
            this.spaceBarPressed = false;
        });
        this.next.addEventListener("click", () => {
            this.nextImage()
        });
        this.previous.addEventListener("click", () => {
            this.previousImage()
        });
    }

    run() {
        this.refreshRun = setInterval(() => {
            this.refresh()
        }, 5000);
        this.play.style.display = 'none';
        this.stop.style.display = 'block';
    }

    refresh() {
        this.imageNum++;
        if (this.imageNum == this.myImages.length) {
            this.imageNum = 0;
        }
        image.src = this.myImages[this.imageNum];
    }


    stopDiaporama() {
        clearInterval(this.refreshRun);
        this.play.style.display = 'block';
        this.stop.style.display = 'none';
    }

    previousImage() {
        this.imageNum--;
        if (this.imageNum < 0) {
            this.imageNum = this.myImages.length - 1;
        }
        image.src = this.myImages[this.imageNum];
    }

    nextImage() {
        this.imageNum++;
        if (this.imageNum == this.myImages.length) {
            this.imageNum = 0;
        }
        image.src = this.myImages[this.imageNum];
    }
}