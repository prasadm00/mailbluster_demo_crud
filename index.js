const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const md5 = require("blueimp-md5");
const helper = require('./helper')

app.use(bodyParser.json());
const PORT = 3000;

app.get('/', async (req, res) => {
    let email = req.query.email;
    let hash = md5(email);
    const url = `https://api.mailbluster.com/api/leads/${hash}`;

    try {
        const responseData = await helper.getData(url);
        res.send(responseData)
    } catch (error) {
        console.log("Error==>>", error);
        res.send(error)
    }
})


app.put('/', async (req, res) => {
    let hash = md5(req.query.email);
    const url = `https://api.mailbluster.com/api/leads/${hash}`

    try {
        const responseData = await helper.updateData(url, req.body);
        console.log("🚀 ~ file: index.js:25 ~ app.get ~ call:", responseData)
        res.send(responseData)
    } catch (error) {
        console.log("Error==>>", error);
        res.send(error)
    }

})

app.delete('/', async (req, res) => {
    const hash = md5(req.query.email);
    const url = `https://api.mailbluster.com/api/leads/${hash}`

    try {
        const responseData = await helper.deleteData(url);
        console.log("🚀 ~ file: index.js:25 ~ app.get ~ call:", responseData)
        res.send(responseData)
    } catch (error) {
        console.log("Error==>>", error);
        res.send(error)
    }

})

app.post('/', async (req, res) => {
    const url = "https://api.mailbluster.com/api/leads";

    let responseData
    try {
        responseData = await helper.addData(url, req.body);
        res.send(responseData)
    } catch (error) {
        console.log("Error===>>>", error);
        res.send(error);
    }

})



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
