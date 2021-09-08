const bookmarksContainer = document.getElementById('bookmarks-Container');
const modalShow = document.getElementById('show-modal');
const modal = document.getElementById('modal')
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-from');
const websiteNameEl = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');

// let bookmarks = []; change array into object beacuse of performance its take more time insated of object becaue we use loop and it take time since the itration is not complete!
let bookmarks = {};

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

    if(!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks[urlValue] = bookmark;
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

//Build bookmarks
function buildBookmarks() {
     //remove bookmark
    bookmarksContainer.textContent = '';

     //build html
     Object.keys(bookmarks).forEach((id) => {
        const { name, url } = bookmarks[id];

        //item
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times-circle');
        closeIcon.setAttribute('title', 'Delete');
        closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);
        //favicon/ Link conatiner
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        //append to bookmark-conatiner
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

//Fetch bookmarks
function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else {
        //Create bookmarks object in localStorage
        const id = `https://www.youtube.com`
        bookmarks[id] = {
            name: 'YouTube',
            url: 'https://www.youtube.com',
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }    
    buildBookmarks();
}

//delete bookmark
function deleteBookmark(id) {
    if(bookmarks[id]) {
        delete bookmarks[id]
    }
    //update bookmark arrey in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

//EVENT LISTENERS
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click',() => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

bookmarkForm.addEventListener('submit', storeBookmark);

//On load
fetchBookmarks();