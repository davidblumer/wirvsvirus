function http(options) {
    let q = new Promise((res, rej) => {
        var request = new XMLHttpRequest();
        request.open(options.method, options.url, true);

        if(!options.noAuth) {
            request.setRequestHeader('Authorization', `Bearer ${authenticationService.token}`);
        }

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                res(JSON.parse(this.response));
            } else {
                
            }
        };

        request.onerror = e => {
            rej(e);
        };

        if(options.formData) {
            request.send(options.formData);
        } else if(options.body) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(options.body);
        } else {
            request.send();
        }

    });

    return q;
}

function formDataToJSON(form) {
    const formData = new FormData(form);

    let obj = {};
    formData.forEach((val, key) => {
        obj[key] = val;
    })

    return JSON.stringify(obj);
}