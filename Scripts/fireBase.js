var app_firebase = {};
(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCMpsNAT0eT5xJ3TjaqNa2NhFdYIYo5VtQ",
        authDomain: "monir-madkour.firebaseapp.com",
        databaseURL: "https://monir-madkour.firebaseio.com",
        projectId: "monir-madkour",
        storageBucket: "",
        messagingSenderId: "358993289125",
        appId: "1:358993289125:web:05b944eeb582c62c59924c"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    app_firebase = firebase;
})()



