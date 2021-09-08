const bookmarksContainer = document.getElementById('bookmarks-Container');
const modalShow = document.getElementById('show-modal');
const modal = document.getElementById('modal')
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-from');
const websiteNameEl = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');


//Show modal
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

//Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    
    if(!nameValue || !urlValue) {
        alert('please submit values for fields.');
    }
    
    if(!urlValue.match(regex)) {
        alert('pleas provide a valid web address');
        return false;
    }    
    return true;
}

//Handal data from form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrl.value;

    if(!urlValue.includes('http://') && !urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`;
    }
    console.log(nameValue, urlValue);
    if(!validate(nameValue, urlValue)) {
        return false;
    }
}

//EVENT LISTENERS
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click',() => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

bookmarkForm.addEventListener('submit', storeBookmark);