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
        const $editSectionGalerie = document.querySelector('#editSectionGalerie');

        // Création de l'element titre de la section
        const $editSectionTitle = document.querySelector('#editSectionTitle');
            $editSectionTitle.innerText = 'Galerie photo';

        createAdminGalery();

        const $addPictureBtn = document.querySelector('#addPictureBtn');
            $addPictureBtn.addEventListener('click', function(){
                $editSectionGalerie.remove();
                $editSectionTitle.innerText = 'Ajout photo';
                
                createNewWorkForm();
            });

        // Ajout du bouton pour fermer le popup
        const $closeBtn = document.querySelector('.closeBtn');
        $closeBtn.addEventListener('click', function(){
            const $fadedBackground = document.querySelector(".blackback");
            const $editSection = document.querySelector(".editSection");
            $fadedBackground.remove();
            $editSection.remove();
        });
})};