
const apiKey = "8f0d34ed-adf6-43d6-bbf3-d51fe5bfd491";
const https = require('https');

async function deleteData(url) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json",
        },
    };

    return new Promise((resolve, reject) => {
        const request = https.request(url, options, function (response) {
            let responseData = '';

            response.on("data", function (chunk) {
                responseData += chunk;
            });

            response.on("end", function () {
                console.log("Success!");
                resolve(JSON.parse(responseData));
            });
        });

        request.on("error", function (error) {
            console.error("Request error:", error);
            reject(error);
        });

        request.end();
    });
}

async function updateData(url, data) {
    console.log("Inside addData", url, data);

    const options = {
        method: "PUT",
        headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json",
        },
    };

    return new Promise((resolve, reject) => {
        const request = https.request(url, options, function (response) {
            let responseData = '';

            response.on("data", function (chunk) {
                responseData += chunk;
            });

            response.on("end", function () {
                console.log("Success!");
                resolve(JSON.parse(responseData));
            });
        });

        request.on("error", function (error) {
            console.error("Request error:", error);
            reject(error);
        });

        // Send the JSON data as the request body
        request.write(JSON.stringify(data));

        request.end();
    });
}


async function getData(url) {

    const options = {
        method: "GET",
        headers: {
            "Authorization": `${apiKey}`
        }
    }
    return new Promise((resolve, reject) => {
        const request = https.request(url, options, async function (response) {
            let responseData = '';

            response.on("data", function (data) {
                responseData += data;
            });

            response.on("end", function () {
                if (response.statusCode === 200) {
                    console.log("Success!");
                    resolve(JSON.parse(responseData));
                } else {
                    console.log("Failed!");
                    reject(JSON.parse(responseData));
                }
            });
        });

        request.on("error", function (error) {
            console.error("Request error:", error);
            reject(error);
        });


        request.end();
    });


}



async function addData(url, data) {

    const options = {
        method: "POST",
        headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json",
        },
    };

    return new Promise((resolve, reject) => {
        const request = https.request(url, options, function (response) {
            let responseData = '';

            response.on("data", function (chunk) {
                responseData += chunk;
            });

            response.on("end", function () {
                console.log("Success!");
                resolve(JSON.parse(responseData));

            });
        });

        request.on("error", function (error) {
            console.error("Request error:", error);
            reject(error);
        });

        // Send the JSON data as the request body
        request.write(JSON.stringify(data));

        request.end();
    });
}


module.exports = { addData, getData, updateData, deleteData }