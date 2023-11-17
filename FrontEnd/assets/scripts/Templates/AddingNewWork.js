import {empty} from '../Utils/emplyElement.js'
import {createEditSection} from "../Templates/EditSection.js"

export function createNewWorkForm(){
    const $addPictureBtn = document.querySelector("#addPictureBtn");
    const $editSection = document.querySelector('.editSection');

    $addPictureBtn.remove();

    const $workForm = document.createElement('form');
        $workForm.innerHTML =`          
            <div class="img" id="img">
                <i class="fa-regular fa-image" id=""></i>
                <input type="file" id="image" name="image"
                    accept="image/png, image/jpeg, image/jpg, image/wepb"                                    
                    max-size="4096">
                <label for="image" class="btn">+ Ajouter une photo</label>
                <p>jpg, png : 4mo max</p>
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
        
        imageInput.addEventListener('change', async function(){
            const imageFile = document.querySelector('#image').files[0];
            const $imgForm = document.querySelector('#img');
            empty($imgForm);

            const $imgPreview = document.createElement('img');
                $imgPreview.classList.add('previewImage');
            $imgForm.appendChild($imgPreview);

            const reader = new FileReader();

            reader.onload = function(e) {
                $imgPreview.src = e.target.result;
            };
            reader.readAsDataURL(imageFile);
        })

        
        $workForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const token = window.localStorage.getItem('token');
            const image = document.querySelector('#image').files[0];
            const title = document.querySelector('#title').value;
            const category = document.querySelector('#category').value;

            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('category', category);

            fetch('http://localhost:5678/api/works', {
                method:"POST",
                headers: {"Authorization": "Bearer " + token },
                body: formData,
            });
        });
};