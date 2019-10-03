const guideList = document.querySelector('.admin');

const setupGuides = (data) => {

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