const $mainContainer = document.getElementById('main');
import {createNewWorkForm} from "../Templates/AddingNewWork.js"
import {createAdminGalery} from "../Functions/CreateAdminGallery.js"

export function createEditSection(){
    const $fadedBackground = document.querySelector('#blackback');
        $fadedBackground.classList.remove('hidden');

    const $editSection = document.querySelector('#editSection');
        $editSection.classList.remove('hidden');
        $editSection.innerHTML = `
            <h2 id="editSectionTitle"></h2>
            <button class="closeBtn"><i class="fa-solid fa-xmark fa-xl"></i></button>
            <div id="editSectionGalerie" class="editSectionGalerie"></div>
            <button class="btn greenBtn" id="addPictureBtn">Ajouter une photo</button>
        `;

    const $editSectionTitle = document.querySelector('#editSectionTitle');
            $editSectionTitle.innerText = 'Galerie photo';

    const $closeBtn = document.querySelector('.closeBtn');
        $closeBtn.addEventListener('click', function(){
            $fadedBackground.classList.add("hidden");
            $editSection.classList.add("hidden");
        });
    
    const $editSectionGalerie = document.querySelector('#editSectionGalerie');
    const $addPictureBtn = document.querySelector('#addPictureBtn');
        $addPictureBtn.addEventListener('click', function(){
            $editSectionGalerie.remove();
            $editSectionTitle.innerText = 'Ajout photo';
            createNewWorkForm();
        });

    createAdminGalery();
};