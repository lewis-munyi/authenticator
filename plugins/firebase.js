import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCkBxFFVY6CrEzxs5klvZTT7Hyj-WEnVT0",
	authDomain: "authenticator-web.firebaseapp.com",
	databaseURL: "https://authenticator-web.firebaseio.com",
	projectId: "authenticator-web",
	storageBucket: "authenticator-web.appspot.com",
	messagingSenderId: "251471237512",
	appId: "1:251471237512:web:603d8647351eb8af006a3d",
	measurementId: "G-JNM4ZF9WJY"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : "";

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
// export const firebase = firebase;
