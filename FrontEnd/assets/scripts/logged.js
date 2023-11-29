import {createNewWorkForm} from"./Templates/AddingNewWork.js"
import {createAdminGalery} from "./Functions/CreateAdminGallery.js"
import {createEditSection} from "./Templates/EditSection.js"

const $loginBtn = document.getElementById('login');
const $worksSection = document.querySelector('#portfolio');
const $header = document.querySelector('#header')
const $normalHeader = document.querySelector('#normal-header');
const $filters = document.querySelector('#filters');

export function isLogged(){
    $loginBtn.innerText = 'logout';
    // Ajout du bouton "modifier"
    const $editModeBanner = document.createElement('div');
        $editModeBanner.classList.add('edit-mode');
        $editModeBanner.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>`
    $header.appendChild($editModeBanner);

    $normalHeader.classList.add('edit-mode-normal-header');

    const $editBtn = document.createElement('button');
        $editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;
        $editBtn.classList.add('editBtn');
    $worksSection.appendChild($editBtn);

    $editBtn.addEventListener('click', function(){
        createEditSection();
    });

    $filters.classList.add('hidden');

    $loginBtn.addEventListener('click', function(){
        $filters.classList.remove('hidden');
        $editModeBanner.remove();
        $normalHeader.classList.remove('edit-mode-normal-header');
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    });
};
