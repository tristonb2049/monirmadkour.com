/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
    
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


function toggleContainer(){
    var toggle = document.getElementById("educationContainer");
    if(toggle.style.width === "300px"){
        toggle.style.width = "0";
        toggle.style.marginBottom = "0";
    }
    else{
        toggle.style.width = "300px";
        toggle.style.marginBottom = "300px";
    }
}

