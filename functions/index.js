const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');


const app = express();
app.use(cors({origin: true}));


admin.initializeApp(
    functions.config().firebase
)

let db = admin.firestore();


// Get all for a specific user
app.get('/', (req, res) => {

});

//Get one by id
app.get('/:id', (req, res) => {

});

//Create a new client
app.post('/', (req, res) => {
    

});

//Change the status (active --> inactive)
app.patch('/:id', (req, res) => {


});




exports.functionsApp = functions.https.onRequest(app);