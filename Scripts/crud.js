var selectedFile;

$("#file").on("change", function(event){
selectedFile = event.target.files[0];
});

function uploadFile()  {

    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/uploadedImages/' + filename);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', function(snapshot){

    }, function(error){

    }, function() {

    var postkey = firebase.database().ref("Posts/").push().key;
    var downloadURL = uploadTask.snapshot.downloadURL;
    var updates = {};
    var postData = {
        url: downloadURL,
        title: $('#imageTitle'),
        medium: $('#imageMedium'),
        dimensions: $('#imageDimensions'),
        year: $('#imageYear')
    }
    updates['/Posts/'+postkey] = postData;
    firebase.database().ref().update(updates);
    console.log(downloadURL);


    });
    


}