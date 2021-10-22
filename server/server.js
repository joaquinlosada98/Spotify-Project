require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        refreshToken
    });

    spotifyApi.refreshAccessToken().then(data => { 
        spotifyApi.setAccessToken(data.body.accessToken);

        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        });
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
        
});


app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);

        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });

    }).catch((err) => {
        console.log('Something went wrong!', err);
    });
});

app.listen(3001);