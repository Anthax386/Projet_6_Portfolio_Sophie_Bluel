import {getWorksData} from "../Data/works.js"
import { empty } from "../Utils/emplyElement.js";
import { createGaleryElement } from "./CreateGalleryElements.js";

const $gallery = document.querySelector('#gallery');

export async function createAdminGalery(){
    const works = await getWorksData();
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
        $editSectionGalerie.appendChild($galleryImg)

        $deletBtn.addEventListener('click',async function(){
            console.log('suppression')
            const token = window.localStorage.getItem('token');
            // Fonction pour supprimer le work dans la bdd
            await fetch (`http://localhost:5678/api/works/${element.id}`, {
                method:'DELETE',
                headers: {"Authorization": "Bearer " + token },
            });
            empty($editSectionGalerie);
            empty($gallery);
            createAdminGalery();
            createGaleryElement();
        });
    });
};