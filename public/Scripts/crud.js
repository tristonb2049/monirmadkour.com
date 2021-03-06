/*------------------------------------------------UPLOAD FILES -- PICTURES--------------------------------------*/
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
        keyVal: postkey,
        title: $('#imageTitle').val(),
        medium: $('#imageMedium').val(),
        dimensions: $('#imageDimensions').val(),
        year: $('#imageYear').val(),
        additional: $('#additionalInfo').val()
    };
    updates['/Posts/' + postkey] = postData;
    firebase.database().ref().update(updates);
    location.reload();
    });
});

}

/*READ PIC & DATA FROM REALTIME- PICTURES*/

var database = firebase.database().ref().child('Posts/');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var counter=0;
        
        snapshot.forEach(function(data){
            var url = data.val().url;
            var keyVal = data.val().keyVal;
            var dimensions = data.val().dimensions;
            var title = data.val().title;
            var year = data.val().year;
            var medium = data.val().medium;
            var additional = data.val().additional;
            
            content += '<div class="col-xl-4 col-lg-6 col-md-6 col-xs-12 imageGrid" id="'+keyVal+'">';
            content += '<a class="lazy example-image-link" href="'+url+'" data-title="'+title+'&lt;br /&gt;'+medium+'&lt;br /&gt;'+dimensions+'&lt;br /&gt;'+year+'&lt;br /&gt;'+additional+'&lt;br /&gt;'+'" data-lightbox="example-1 '+counter+'"><img class="lazy example-image" width="300" height="200" src="'+url+'" alt="'+title+'"/></a>';
            content += '</br><button class="btn btn-danger deleteButton logged-inX" onclick="deleteFile(this)">x</button>';
            content += '<button class="btn btn-light editButton logged-inX" data-toggle="modal" data-target="#myModalUpdate" onclick="getUpdateId(this)">&#9998;</button>';
            content += '</div>';
            counter++;
            
        });
        $('.displayImagesFromFirebase').append(content);
            setupUI(firebase.auth().currentUser);
    }

});



/*-------------------------------DELETE Database Data----------------------------------------------------------*/


function deleteFile(element){
 
var postId = $(element).closest('div').attr('id');
var sure = confirm("Are you sure you want to delete this post?");
if(sure){
   firebase.database().ref().child('Posts/' + postId).remove().then(function(){
   location.reload();
   });
   }
  };
    
/*-----------------------------------UPDATE DATABASE DATA--------------------------------------------------------------*/

function getUpdateId(element){

    var postId = $(element).closest('div').attr('id');
    console.log(postId);
    var submit = document.getElementById("uploadButtonUpdate");

    submit.onclick = function(){

        var postData = {

            title: $('#imageTitleUpdate').val(),
            medium: $('#imageMediumUpdate').val(),
            dimensions: $('#imageDimensionsUpdate').val(),
            year: $('#imageYearUpdate').val(),
            additional: $('#additionalInfoUpdate').val()
        };
        

        for (data in postData){
            if(postData[data] != null && postData[data] != 0){
            firebase.database().ref().child('Posts/' + postId).update(postData);
            }
        }
            location.reload();
  
    }
}