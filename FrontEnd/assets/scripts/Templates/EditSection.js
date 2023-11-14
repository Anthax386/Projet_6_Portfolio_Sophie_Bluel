const $mainContainer = document.getElementById('main');

export function createEditSection(){
    const $fadedBackground = document.createElement('div');
        $fadedBackground.classList.add('blackback');
    $mainContainer.appendChild($fadedBackground);

    const $editSection = document.createElement('section');
        $editSection.classList.add('editSection');
        $editSection.innerHTML = `
            <h2 id="editSectionTitle"></h2>
            <button class="closeBtn"><i class="fa-solid fa-xmark fa-xl"></i></button>
            <div id="editSectionGalerie"></div>
            <button class="btn greenBtn" id="addPictureBtn">Ajouter une photo</button>
        `;
    $mainContainer.appendChild($editSection);
};