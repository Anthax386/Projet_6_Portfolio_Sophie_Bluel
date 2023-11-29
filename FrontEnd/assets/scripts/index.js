import {createGaleryElement, getFilteredWorks} from"./Functions/CreateGalleryElements.js"
import {getWorksData} from "./Data/works.js"
import {isLogged} from "./logged.js"
import {empty} from "./Utils/emplyElement.js"

const userIdLocal = window.localStorage.getItem("userId");
const tokenLocal = window.localStorage.getItem('token');

const userIdSession = window.sessionStorage.getItem('userId');
const tokenSession = window.sessionStorage.getItem('token');

const $tous = document.getElementById('tous');
const $objets = document.getElementById('objects');
const $appartements = document.getElementById('appartements');
const $hotels = document.getElementById('hotels');
const $loginBtn = document.getElementById('login');

const works = await getWorksData();

function createAllWorks() {
    empty(gallery);
    createGaleryElement();
};

function changeActiveBtn() {
    $objets.classList.remove('greenBtn');
    $appartements.classList.remove('greenBtn');
    $hotels.classList.remove('greenBtn');
    $tous.classList.remove('greenBtn');
};

createGaleryElement();

const filters = [$tous, $objets, $appartements, $hotels];
for (const [index, filter] of filters.entries()) {
    filter.addEventListener("click", async function(){
        index === 0 ? createAllWorks():getFilteredWorks(index);
        changeActiveBtn();
        filter.classList.add('greenBtn');
    });
};

let userId = null;
let token = null;

if (userIdLocal && tokenLocal) {
    userId = userIdLocal;
    token = tokenLocal;
} else if(userIdSession && tokenSession){
    userId = userIdSession;
    token = tokenSession;
}

if (userId != null && token != null){
    isLogged();
} else {
    $loginBtn.innerText = "login";
    $loginBtn.addEventListener('click', function(){
        location.href='./login.html';
    });
};