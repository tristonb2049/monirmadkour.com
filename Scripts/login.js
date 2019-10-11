const guideList = document.querySelector('.admin');
const loggedIn = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if(user){
        //toggle UI elements
        loggedIn.forEach(item => item.style.display = 'block');
    }
    else{
        loggedIn.forEach(item => item.style.display = 'none');
    }
}

/*
const setupGuides = (data) => {


    if(data.length){
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const p = `
        <p class="pageText">${guide.title}</p>
        <p class="pageText">${guide.title}</p>
        <p class="pageText">${guide.title}</p>
        <p class="pageText">${guide.title}</p>
        <p class="pageText">${guide.title}</p>
        `;
        html += p;
    });
    guideList.innerHTML = html;
    }
    else{
        
    }
}
*/