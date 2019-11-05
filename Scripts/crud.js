/*UPLOAD FILES -- PICTURES*/
var uploader = document.getElementById("uploadPic");
var selectedFile;


$("#file").on("change", function(event){
selectedFile = event.target.files[0];
});

function uploadFile()  {

    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/uploadedImages/' + filename);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', function(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;

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
/*
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
            content += '<img class="myImg" src="'+url+'" width="300" height="200" alt="'+title+'">';
            content += '<div class="modal" id="myModalPic">';
            content += '<span class="closeModal">&times;</span>';
            content += '<img class="modal-content img">';
            content += '<div class="caption">';
            content += '<span>'+title+'</span></br>';
            content += '<span>'+dimensions+'</span></br>';
            content += '<span>'+medium+'</span>';
            content += '</div>';
            content += '</div>';
            content += '</div>';
        });
        $('.displayImagesFromFirebase').append(content);
    }
});
*/
var database = firebase.database().ref().child('Posts/');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var counter=0;
        snapshot.forEach(function(data){
            var url = data.val().url;
            var dimensions = data.val().dimensions;
            var title = data.val().title;
            var year = data.val().year;
            var medium = data.val().year;
            
            content += '<div class="col-xl-4 col-xs-12 imageGrid">';
            content += '<a class="example-image-link" href="'+url+'" data-lightbox="example-1"><img class="example-image" width="300" height="200" src="'+url+'" alt="image-1"/></a>';
            content += '</div>';
            content += '</div>';
            content += '</div>';

        });
        $('.displayImagesFromFirebase').append(content);
    }
});







/*

// Get the modal

window.onload = function(){
    var modal = document.querySelector("id");
    
    // Get the image and insert it inside the modal
    //var modal = $('.myModalPic')
    var img = $('.myImg');
    var modalImg = $(".img");
    var imageInfo = $('.imageInformation');
    var captionText = document.getElementsByClassName("caption");
    $('.myImg').click(function(){
        modal.style.display = "block";
        var newSrc = this.src;
        modalImg.attr('src', newSrc);
        //captionText.innerHTML = this.imageInfo.innerHTML;
    });
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeModal")[0];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    }   



    <div class="container">
                <div class="row displayImagesFromFirebase">
                    <div class="col-xl-4 col-xs-12 imageGrid">
                            
                            <img class="myImg" src="../Images/TestContainer.png" alt="Test" width="300" height="200">
                            <div id="myModalPic" class="modal">
                            <span class="closeModal">&times;</span>
                              <img class="modal-content img">
                              <div class="caption">
                                  <span>Title: </span></br>
                                  <span>Dimensions: </span></br>
                                  <span>Medium:<span>
                                </div>
                            </div>  
                    </div>
                    <div class="col-xl-4 col-xs-12 imageGrid">
                            
                        <img class="myImg" src="../Images/bioImage.png" alt="Test" width="300" height="200">
                        <div id="myModalPic" class="modal">
                        <span class="closeModal">&times;</span>
                          <img class="modal-content img">
                          <div class="caption">
                              <span>Title: </span></br>
                              <span>Dimensions: </span></br>
                              <span>Medium:<span>
                            </div>
                        </div>  
                </div>
                       
                </div>
            </div>
    */