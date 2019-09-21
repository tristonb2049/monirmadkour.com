
//Listen for authorization changes
firebase.auth().onAuthStateChanged(user => {
    console.log(user);
})


//sign-in

const loginForm = document.querySelector('#login-form');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;


        firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);

        });
    });
}

/*
function redirect(){
    window.location = "../index.html";
}

//redirect after authentication success
    firebase.auth().onAuthStateChanged( user => {
        if(user){
            setTimeout(redirect, 4000);
        }
    });
  */   
//logout
const logout = document.querySelector('#logout');
if(logout) {
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            console.log("Logged out successfully");
        });
    });
}