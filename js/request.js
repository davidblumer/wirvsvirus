function http(options) {
    let q = new Promise((res, rej) => {
        var request = new XMLHttpRequest();
        request.open(options.method, options.url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                res(JSON.parse(this.response));
            } else {
                
            }
        };

        request.onerror = e => {
            rej(e);
        };

        request.send();

    });

    return q;
}