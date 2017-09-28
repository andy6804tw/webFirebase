var selectedFile;
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

//jquery執行
$(document).ready(function () {

    $("#uploadButton").hide();
    $("#file").on("change", function (event) {
        selectedFile = event.target.files[0];
        $("#uploadButton").show();
    });



});

function uploadFile() {

    // Create a root reference
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/products/' + filename);
    var uploadTask = storageRef.put(selectedFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        //寫入Database
        /*var postKey=firebase.database().ref("Posts/").push().key;//自動產生一組亂數key
        var updates={};
        var postData={
            url:downloadURL,
            descrption:$('#imageDesc').val()
        }
        updates['/Posts/'+postKey]=postData;
        firebase.database().ref().update(updates);*/
        var msgRef =firebase.database().ref('/Post/'); //寫入位置
        msgRef.push({
            url:downloadURL,
            descrption:$('#imageDesc').val()
        })
        console.log(downloadURL);
    });

}