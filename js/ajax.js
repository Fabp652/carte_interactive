function ajax(url, callback) {
    this.requestStation = new XMLHttpRequest();
    this.requestStation.onreadystatechange = () => {
        if (this.requestStation.readyState == 4 && this.requestStation.status == 200) {
            callback(JSON.parse(this.requestStation.responseText));
        };
    }
    this.requestStation.open("GET", url, true);
    this.requestStation.send(null);
}