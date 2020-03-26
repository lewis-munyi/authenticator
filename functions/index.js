const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./firebase-adminsdk.json"); // Auth credentials
const cors = require('cors')({ origin: true, });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://authenticator-web.firebaseio.com"
});
let db = admin.firestore();

//Toggle the status (active <--> inactive)
exports.updateClient = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        try {
            admin.auth().verifyIdToken(req.header("Authorization").split(" ")[1])
                .then(function(decodedToken) {
                    let ref = db.collection('users').doc(decodedToken.uid).collection('clients').doc(req.body.id);
                    ref.get()
                        .then(doc => {
                            if (!doc.exists) {
                                return res.status(404).json({ message: "Client does not exist" });
                            } else {
                                ref.update({
                                    status: !doc.data().status,
                                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                                })
                                    .then((response) => {
                                        return res.status(200).json({ message: "Success" })
                                    })
                                    .catch((error) => {
                                        return res.status(500).json({ message: error.message })
                                    });
                            }
                        })
                        .catch(err => {
                            return res.status(500).json({ message: `Error updating document: ${err.message}`});
                        });
                })
                .catch(function(error) {
                    return res.status(401).json({ message: error.message });
                });
        }
        catch(e){
            return res.status(500).json({ message: e.message });
        }
    });
});

// Create a new client
exports.newClient = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        try {
            admin.auth().verifyIdToken(req.header("Authorization").split(" ")[1])
                .then(function(decodedToken) {
                    let clientRef = db.collection('users').doc(decodedToken.uid).collection('clients');
                    clientRef.add({
                        projectName: req.body.name,
                        client: req.body.client,
                        clientContact: req.body.contact,
                        description: req.body.description,
                        status: req.body.status,
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    }).then((response) => {
                        return res.status(200).json({ client: response.id })
                    }).catch((err) => {
                        return res.status(500).json({ message: err.message });
                    });
                }).catch(function(error) {
                return res.status(401).json({ message: error.message });
            });
        }
        catch(e){
            return res.status(500).json({ message: e.message });
        }
    });
});

// Get all for a specific user
exports.allClients = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        try {
            admin.auth().verifyIdToken(req.header("Authorization").split(" ")[1]) // Pass JW Token
                .then(function(decodedToken) {
                    db.collection('users').doc(decodedToken.uid).collection('clients').orderBy("timestamp", "desc").get()
                        .then((snapshot) => {
                            let results = snapshot.docs.map((obj)=>{return {id:obj.id, data:obj.data()}});
                                return res.status(200).send(results);
                        })
                        .catch((error) => {
                            return res.status(500).json({ message: error.message })
                        });
                }).catch(function(error) {
                return res.status(401).json({ message: error.message });
            });
        }
        catch(e){
            return res.status(500).json({ message: e.message });
        }
    });
});