import {createNewWorkForm} from"./Templates/AddingNewWork.js"
import {createAdminGalery} from "./Functions/CreateAdminGallery.js"
import {createEditSection} from "./Templates/EditSection.js"

const $worksSection = document.getElementById('portfolio');

export function isLogged(){
    // Ajout du bouton "modifier"
    const $editBtn = document.createElement('button');
        $editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;
        $editBtn.classList.add('editBtn');
    $worksSection.appendChild($editBtn);

    $editBtn.addEventListener('click', function(){
        createEditSection();
})};