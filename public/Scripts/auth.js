
//Listen for authorization changes
firebase.auth().onAuthStateChanged(user => {

    if(user){
        //Get data, calls function in login.js 'setupGuides'
        setupUI(user);
        console.log(user);
        
    }
    else{
        setupUI();
    }
});


//sign-in

const loginForm = document.querySelector('#login-form');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;


        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            window.location = "../index.html";
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Email or Password is incorrect!");
        });
    });
}


//logout
const logout = document.querySelector('#logout');
if(logout) {
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        firebase.auth().signOut();
    });
}