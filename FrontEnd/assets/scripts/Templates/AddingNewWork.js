import {empty} from '../Utils/emplyElement.js'
import {createEditSection} from "../Templates/EditSection.js"
import { createGaleryElement } from '../Functions/CreateGalleryElements.js';

const $gallery = document.querySelector('#gallery');

export function createNewWorkForm(){
    const $addPictureBtn = document.querySelector("#addPictureBtn");
    const $editSection = document.querySelector('.editSection');

    $addPictureBtn.remove();

    const $workForm = document.createElement('form');
        $workForm.innerHTML =`          
            <div class="img" id="img">
                <i class="fa-regular fa-image" id=""></i>
                <input type="file" id="image" name="image"
                    accept="image/png, image/jpeg, image/jpg, image/wepb, image/jpeg"                                    
                    max-size="4096">
                <label for="image" class="btn">+ Ajouter une photo</label>
                <p>jpg, png : 4mo max</p>
                <p class='hidden errorMsg' id='invalidFile'>Fichier invalide !</p>
            </div>
            <div class="input">
                <label for="title">Titre</label>
                <input type="text" name="title" id="title" class="inputfile">
            </div>                            
            <div class="input">
                <label for="category">Catégorie</label>
                <select name="category" id="category">
                    <option value="" selected disabled hidden></option>
                    <option value="1">Objet</option>
                    <option value="2">Appartement</option>
                    <option value="3">Hôtel et Réstaurant</option>
                </select>
            </div>
            <p class='hidden errorMsg' id='errorMsg'>Attention, il manque des informations !</p>
            <input type="submit" class="btn greyBtn" value="Valider" id="valider">
        `;
        $workForm.classList.add('newWorkForm');
        $editSection.appendChild($workForm);

        const $backArrow = document.createElement('button');
        $backArrow.classList.add('backArrow');
        $backArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        $backArrow.addEventListener('click', function(){
            $workForm.remove();
            createEditSection();
        })
        $editSection.appendChild($backArrow);

        const $submitBtn = document.querySelector('#valider');
        const imageInput = document.querySelector('#image');
        const titleInput = document.querySelector('#title');
        const categoryInput = document.querySelector('#category');
        const image = imageInput.files[0];
        const title = titleInput.value;
        const category = categoryInput.value;
        const formInput = [imageInput, titleInput, categoryInput];

        formInput.forEach(input => {
            input.addEventListener("change", function(){
                if (imageInput.files[0] && titleInput.value && categoryInput.value) {
                    $submitBtn.classList.remove('greyBtn');
                    $submitBtn.classList.add('greenBtn');
                };
            });
        });
        
        function getImgFile(){
            const imageFile = document.querySelector('#image').files[0];
            return imageFile;
        }

        imageInput.addEventListener('change', async function(){
            const imageFile = await getImgFile();
            console.log(imageFile.type)
            if (imageFile.type === 'image/png' || imageFile.type === 'image/jpg' || imageFile.type === 'image/wepb' || imageFile.type === 'image/jpeg' && imageFile.size <= 4000000){
                const $imgForm = document.querySelector('#img');
                for (let i=0; i < $imgForm.children.length; i++) {
                    $imgForm.children[i].classList.add('hidden')
                };

                const $imgPreview = document.createElement('img');
                    $imgPreview.classList.add('previewImage');
                $imgForm.appendChild($imgPreview);

                const reader = new FileReader();

                reader.onload = function(e) {
                    $imgPreview.src = e.target.result;
                };
                reader.readAsDataURL(imageFile);
            } else {
                const $invalidFile = document.querySelector('#invalidFile');
                    $invalidFile.classList.remove('hidden');
            };
        });

        
        $workForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const token = window.localStorage.getItem('token');
            const image = await getImgFile();
            const title = document.querySelector('#title').value;
            const category = document.querySelector('#category').value;

            if (image &&  title && category) {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('title', title);
                formData.append('category', category);

                await fetch('http://localhost:5678/api/works', {
                    method:"POST",
                    headers: {"Authorization": "Bearer " + token },
                    body: formData,
                });
                $workForm.remove();
                createEditSection();
                empty($gallery);
                createGaleryElement();
            } else {
                const $errorMsg = document.querySelector('#errorMsg');
                    $errorMsg.classList.remove('hidden')
            };            
        });
};