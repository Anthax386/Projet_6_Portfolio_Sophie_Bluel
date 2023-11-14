import {getWorksData} from "../Data/works.js"
const works = await getWorksData();

export function createAdminGalery(){
    // Création de la secton qui contient les images de la galerie
    const $editSectionGalerie = document.querySelector('#editSectionGalerie');
    // Boucle pour la création des images
    works.forEach(element => {
        // Création de l'article qui comprendra tout les elements
        const $galleryImg = document.createElement('article');
            $galleryImg.innerHTML = `
                <img src= " ${element.imageUrl} " alt=" ${element.title}">
            `;
            const $deletBtn = document.createElement('button');
                $deletBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
                $deletBtn.classList.add('deletBtn');
                $deletBtn.setAttribute('id', 'deletBtn');
            $galleryImg.appendChild($deletBtn)
            $galleryImg.classList.add('editGallery');
        $editSectionGalerie.appendChild($galleryImg);

        // Ajout du bouton supprimer
        // const $deletBtn = document.querySelector('.deletBtn');
            $deletBtn.addEventListener('click', function(){
                const token = window.localStorage.getItem('token');
            // Fonction pour supprimer le work dans la bdd
                console.log('suppréssion...')
                fetch (`http://localhost:5678/api/works/${element.id}`, {
                    method:'DELETE',
                    headers: {"Authorization": "Bearer " + token },
                });
            });
    });
};