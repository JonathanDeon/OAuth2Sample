const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    uuid = require('uuid/v1'),
    crypto = require('crypto'),
    fs = require('fs'),
    https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

const tokenMap = new Map();
let sessionId;
let token;



app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/login.html`);
});

app.get('/facebookapp/callback', (request, response) => {
    //response.sendFile(`${__dirname}/home.html`);
    console.log("here");
    console.log(response.params);

    // const http = require('http');

    // var clientId = 278094523037135;
    // var appSecret = "2c256f02832c18f9b38656a4bb894c91";
    // var authorizationBasic = window.btoa(clientId + ':' + appSecret);
    // var data = "grant_type=authorization_code&client_id=278094523037135&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Ffacebookapp%2Fcallback&code="+authorizationCode;
    
    // const options = {
    //     // hostname: '172.28.49.9',
    //     port: 4000,
    //     path: 'https://graph.facebook.com/oauth/access_token',
    //     method: 'POST',
    //     headers: {
    //         'authorization': 'Basic '+authorizationBasic,
    //     }
    // };
    
    // const req = http.request(options, (res) => {
    //     res.setEncoding('utf8');
    //     res.on('data', (chunk) => {
    //         console.log(`BODY: ${chunk}`);
    //     });
    //     res.on('end', () => {
    //         console.log('No more data in response.');
    //     });
    // });
    
    // req.on('error', (e) => {
    //     console.error(`problem with request: ${e.message}`);
    // });
    
    // // write data to request body
    // req.write(data);
    // req.end();











});

app.post('/login', (request, response) => {
    console.log(request);
    crypto.randomBytes(48, (err, buffer) => {
        sessionId = uuid();
        token = buffer.toString('hex');
        response.cookie('__user', JSON.stringify({uuid: sessionId, csrf_token: token}));

        response.send({
            'message': 'success'
        });
    });
});

app.post('/postWithCsrf', (request, response) => {
    console.log(JSON.parse(request.cookies.__user).uuid, 'user', JSON.parse(request.cookies.__user).csrf_token);
   if (request.body.csrf_token === JSON.parse(request.cookies.__user).csrf_token) {
    response.send({
        'message': 'success'
    });
   } else {
    response.send({
        'error': 'csrf token does not match'
    });
   }
});

app.get('/csrf', (request, response) => {
    crypto.randomBytes(48, (err, buffer) => {
        token = buffer.toString('hex');
        tokenMap.set(sessionId, token);

        response.send({
            'token': token
        });
    });
});

// https.createServer({
//     key: fs.readFileSync('privatekey.pem'),
//     cert: fs.readFileSync('certificate.pem')
//   }, app)
//   .listen(4200, function () {
//     console.log('app listening on port 3000! Go to https://localhost:4200/')
//   })

app.listen(4200)
