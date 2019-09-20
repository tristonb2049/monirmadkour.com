//sign-in

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    

    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        
    });
});

//redirect after authentication success
    firebase.auth().onAuthStateChanged( user => {
        if(user){
            window.location = "../index.html";
        }
    });