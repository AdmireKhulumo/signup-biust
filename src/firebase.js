import firebase from "firebase";

var config = {
	apiKey: "AIzaSyCFmHiufk-yZfNA4tY7um3PuRElYG1dGKg",
	authDomain: "biustregister-7e90d.firebaseapp.com",
	databaseURL: "https://biustregister-7e90d.firebaseio.com",
	projectId: "biustregister-7e90d",
	storageBucket: "biustregister-7e90d.appspot.com",
	messagingSenderId: "52469479805",
	appId: "1:52469479805:web:ff8c44a609b66d1c077414",
	measurementId: "G-W3DJD6WKS4"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
firebase.analytics();

export { db };
export { firebaseApp };
