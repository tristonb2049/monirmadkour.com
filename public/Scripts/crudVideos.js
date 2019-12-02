/*------------------------------------------------UPLOAD FILES -- PICTURES--------------------------------------*/
var uploader = document.getElementById("uploadVideo");
var selectedFile;


$("#file").on("change", function(event){
selectedFile = event.target.files[0];
});

function uploadFile()  {

    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/uploadedVideos/' + filename);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', function(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;

    }, function(error){

    }, async function() {
    
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
        console.log('File avaiable at', downloadURL)
    
    var postkey = firebase.database().ref().child('Videos/').push().key;
    
    var updates = {};
    var postData = {
        url: downloadURL,
        keyVal: postkey,
        additional: $('#additionalInfo').val()
    };
    updates['/Videos/' + postkey] = postData;
    firebase.database().ref().update(updates);
    location.reload();
    });
});

}

/*READ PIC & DATA FROM REALTIME- PICTURES*/

var database = firebase.database().ref().child('Videos/');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var counter=0;
        var idCounter = 0;
        snapshot.forEach(function(data){
            
            var url = data.val().url;
            var keyVal = data.val().keyVal;
            var additional = data.val().additional;
            
            content += '<div class="col-xl-12 col-xs-12 videoGrid" id="'+keyVal+'">';
            content += '<video controls src="'+url+'" width="100%" height="490px">';
            content += '</video>';
            content += '<p class="videoCaption">'+additional+'</p>';
            content += '</br><button class="btn btn-danger deleteButton logged-inX" onclick="deleteFile(this)">x</button>';
            content += '<button class="btn btn-light editButton logged-inX" data-toggle="modal" data-target="#myModalUpdate" onclick="getUpdateId(this)">&#9998;</button>';
            content += '</div>';
            counter++;
            idCounter++;
        });
        $('.displayVideosFromFirebase').append(content);
            setupUI(firebase.auth().currentUser);
    }

});



/*-------------------------------DELETE Database Data----------------------------------------------------------*/


function deleteFile(element){
 
var postId = $(element).closest('div').attr('id');
var sure = confirm("Are you sure you want to delete this post?");
if(sure){
   firebase.database().ref().child('Videos/' + postId).remove().then(function(){
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
            additional: $('#additionalInfoUpdate').val()
        };
        

        for (data in postData){
            if(postData[data] != null && postData[data] != 0){
            firebase.database().ref().child('Videos/' + postId).update(postData);
            }
        }
            location.reload();
  
    }
}