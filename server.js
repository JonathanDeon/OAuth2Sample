const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/register.html`);
});

app.get('/facebookapp/callback', (request, response) => {
    response.sendFile(`${__dirname}/register.html`);
});

app.listen(4200, err =>{
    if(err){
        console.log(err);
    } else{
        console.log("App running on 4200")
    }
})
