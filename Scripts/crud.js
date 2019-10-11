/*UPLOAD FILES -- PICTURES*/

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

    }, async function() {
    
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
        console.log('File avaiable at', downloadURL)
    




    
    var postkey = firebase.database().ref().child('Posts/').push().key;
    
    var updates = {};
    var postData = {
        url: downloadURL,
        title: $('#imageTitle').val(),
        medium: $('#imageMedium').val(),
        dimensions: $('#imageDimensions').val(),
        year: $('#imageYear').val()
    };
    updates['/Posts/' + postkey] = postData;
    firebase.database().ref().update(updates);
    
    });
});

}

/*READ FILES - PICTURES*/

var database = firebase.database().ref().child('Posts/');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';

        snapshot.forEach(function(data){
            var url = data.val().url;
            var dimensions = data.val().dimensions;
            var title = data.val().title;
            var year = data.val().year;
            var medium = data.val().year;
            
            content += '<div class="col-xl-4 col-xs-12 imageGrid">';
            content += '<img class="myImg" src="'+url+'" width="300" height="200">';
            content += '<div id="myModalPic" class="modal">';
            content += '<span class="closeModal">&times;</span>';
            content += '<img class="modal-content img">';
            content += '<div class="caption">';
            content += '<span>'+title+'</span>';
            content += '<span>'+dimensions+'</span>';
            content += '<span>'+medium+'</span>';
            content += '</div>';
            content += '</div>';
            content += '</div>';
        });
        $('.displayImagesFromFirebase').append(content);
    }
});