import firebase from "firebase";

var config = {
	apiKey: "AIzaSyCxBAHorVgvdM8nRtb__ri3GsxFYBgubtI",
	authDomain: "biustregister.firebaseapp.com",
	databaseURL: "https://biustregister.firebaseio.com",
	projectId: "biustregister",
	storageBucket: "biustregister.appspot.com",
	messagingSenderId: "100250685493",
	appId: "1:100250685493:web:a17a0f3ca2dfc85f3ba17c",
	measurementId: "G-SWGKQ8C5QT"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
firebase.analytics();

export { db };
export { firebaseApp };
