export function createNewWorkForm(){
    const $addPictureBtn = document.querySelector("#addPictureBtn");
    const $editSection = document.querySelector('.editSection');

    $addPictureBtn.remove();

    const $workForm = document.createElement('form');
        $workForm.innerHTML =`
            <button class="backArrow"><i class="fa-solid fa-arrow-left"></i></button>
            <div class="img">
                <i class="fa-regular fa-image"></i>
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

        $workForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const token = window.localStorage.getItem('token');
            const Image = document.querySelector('#image').files[0];
            const Title = document.querySelector('#title').value;
            const Category = document.querySelector('#category').value;

            const formData = new FormData();
            formData.append('image', Image);
            formData.append('title', Title);
            formData.append('category', Category);

            fetch('http://localhost:5678/api/works', {
                method:"POST",
                headers: {"Authorization": "Bearer " + token },
                body: formData,
            });
        });
};