const guideList = document.querySelector('.admin');


const setupUI = (user) => {

    const loggedIn = document.querySelectorAll('.logged-in');
    const loggedInX = document.querySelectorAll('.logged-inX');
    
    if(user){
        //toggle UI elements
        loggedIn.forEach(item => item.style.display = 'block');
        loggedInX.forEach(item => item.style.display = 'inline-block');

    }
    else{
        loggedIn.forEach(item => item.style.display = 'none');
        loggedInX.forEach(item => item.style.display = 'none');
       

    }
}

