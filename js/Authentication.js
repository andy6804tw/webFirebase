// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOOrsP1xiZESmcuWg3iHdOw4j-fCmOCGc",
    authDomain: "webfirebase-88e1c.firebaseapp.com",
    databaseURL: "https://webfirebase-88e1c.firebaseio.com",
    projectId: "webfirebase-88e1c",
    storageBucket: "webfirebase-88e1c.appspot.com",
    messagingSenderId: "1057133298025"
};
firebase.initializeApp(config);



function onClick(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    console.log("email: "+email);
    console.log("password: "+password);
    //註冊新用戶
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode+" "+errorMessage)
        // ...
    });
    alert("Finish!");
}