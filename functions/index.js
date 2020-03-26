const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')


admin.initializeApp(
    functions.config().firebase
)

const app = express();
app.use(cors({origin: true}));

app.use(bodyParser.json())


let db = admin.firestore();

// Map all ids to respective data
function m(obj){
    return {id:obj.id, data:obj.data()}
}

// Get all for a specific user
app.get('/', (req, res) => {
        db.collection('users').doc('lewis').collection('clients').get()
        .then((snapshot) => {
            var results = snapshot.docs.map(m);
            return res.status(200).send({status: "Success", data: results });
        })
        .catch((error) => {
            console.log(error);
            return res.send({ message: error, status:"Error" })  
        });
});

//Get one by id
app.get('/:id', (req, res) => {
    let id = req.params.id;
    let ref = db.collection('users').doc('lewis').collection('clients').doc(id);
    let getDoc = ref.get()
        .then(doc => {
            if (!doc.exists) {
                return res.send({ response: 'No such document!',status: "Error"});
            }else {
                return res.send({ response: doc.data(),status: "Success"});
        }})
        .catch(err => {
            return res.send({response: 'Error getting document',status: "Error"});
        });
});

//Create a new client
app.post('/', (req, res) => {
    if(!req.body) {
            return res.status(400).send({response: "Content can not be empty", status: "Error"});
        }
    let clientRef = db.collection('users').doc('lewis').collection('clients').doc();
    clientRef.set({
        projectName: req.body.projectName,
        client: req.body.client,
        clientContact: req.body.clientContact,
        description: req.body.description,
        status: false
    }).then((response) =>{
        return res.send({message: "Success", response: "OK" })
    }).catch((err) =>{
        return res.send({message: "Error",response: err})
    });
});
// cLJv1kcPwDY1UKA1M7kt
//Change the status (active --> inactive)
app.patch('/:id', (req, res) => {
    let id = req.params.id;
    let ref = db.collection('users').doc('lewis').collection('clients').doc(id);
    let docUpdate = ref.get()
        .then(doc => {
            if (!doc.exists) {
                return res.send({response: 'No such document!',status: "Error"});
            }else {
                ref.update({status: !doc.data().status})
                .then((response) =>{
                    return res.send({response: response,status: "Success"})
                })
                .catch((error) => {
                    return res.send({response: error,status: "Error"})
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.send({response: 'Error updating document',status: "Error"});
        });
});

exports.functionsApp = functions.https.onRequest(app);