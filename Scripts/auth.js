//setup UI


//Listen for authorization changes
firebase.auth().onAuthStateChanged(user => {
    if(user){
        //Get data, calls function in login.js 'setupGuides'
    firebase.firestore().collection('photos').get().then(snapshot => {
    setupGuides(snapshot.docs);
    setupUI(user);
    console.log(user);
    });
    }
    else{
        setupUI();
        setupGuides([]);
    }
});


//sign-in

const loginForm = document.querySelector('#login-form');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;


        firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {

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