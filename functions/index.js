const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./firebase-adminsdk.json"); // Auth credentials
const cors = require('cors')({ origin: true, });
const AES = require("crypto-js/aes");
const UTF8 = require("crypto-js/enc-utf8");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://authenticator-web.firebaseio.com"
});
let db = admin.firestore();

// Check if a project is authorized
exports.checkStatus = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        try {
            // Decrypt token
            let bytes  = AES.decrypt(req.body.token, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(UTF8));

            // Fetch record
            db.collection('users').doc(decryptedData.user_id).collection('clients').doc(decryptedData.client_id)
                .get()
                .then(doc => {
                    if(doc.exists){
                        if(doc.data().status === true){
                            return res.status(200).json({ message: 'ok' });
                        }
                        else{
                            return res.status(401).json({ message: 'unauthorized' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'not found' });
                    }
                })
                .catch(error => {
                    return res.status(500).json({ message: 'internal server error: ' + error.message});
                });
        }
        catch(e){
            return res.status(500).json({ error: e.message });
        }
    });
});

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
                    clientRef
                        .add({
                            projectName: req.body.name,
                            client: req.body.client,
                            clientContact: req.body.contact,
                            description: req.body.description,
                            status: req.body.status,
                            timestamp: admin.firestore.FieldValue.serverTimestamp(),
                            created_at: admin.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((response) => {
                            clientRef
                                .doc(response.id)
                                .update({
                                    token: AES.encrypt(JSON.stringify({user_id: decodedToken.uid, client_id: newClient}), 'secret key 123').toString(),
                                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                                })
                                .then(()=>{
                                    return res.status(200).json({ message: 'success' })
                                })
                                .catch((error)=>{
                                    return res.status(500).json({ error: error.message })
                                })
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
                    db
                        .collection('users').doc(decodedToken.uid).collection('clients').orderBy("created_at", "desc")
                        .get()
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