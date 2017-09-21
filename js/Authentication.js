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
    var check=0;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        //錯誤檢查
        check=1;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode+" | "+errorMessage+" | "+error)
        
        // ...
    });
    setTimeout(function(){
        if(check==1)
            alert("錯誤！請確認格式");
        else{
            document.location.href="../seeAuth.html";
            //寫入database
            var msgRef =firebase.database().ref('/Auth/');
            msgRef.push({
            messages:email
            })
        }
        
    },1000);
 
    
}