import { getData } from "./works.js";

async function isLoged (){
    // Récupère les info de connexion dans le local storage
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem('token');

    const loginBtn = document.getElementById('login');
    const worksSection = document.getElementById('portfolio');

    const works = await getData();

    // Vérifie si l'utilisateur est connecté
    if (userId == 1 && token){

        // Modifie le boutton login pour logout
        loginBtn.innerText = 'logout';
        loginBtn.addEventListener('click', function(){
            localStorage.clear();
            location.reload();
        })

        // Ajout du bouton "modifier"
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
        editBtn.classList.add('editBtn');
        worksSection.append(editBtn);

        editBtn.addEventListener('click', function(){
            const mainContainer = document.getElementById('main');
            //
            const fadedBackground = document.createElement('div');
            fadedBackground.classList.add('blackback');
            mainContainer.appendChild(fadedBackground)

            // Création de la section de modification
            const editSection = document.createElement('section');
            editSection.classList.add('editSection')
            mainContainer.appendChild(editSection);

            // Création de l'element titre de la section
            const editSectionTitle = document.createElement('h2');
            editSectionTitle.innerText = 'Galerie photo';
            editSection.appendChild(editSectionTitle);

            // Ajout du bouton pour fermer le popup
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML= '<i class="fa-solid fa-xmark fa-xl"></i>';
            closeBtn.classList.add('closeBtn');
            closeBtn.addEventListener('click', function(){
                fadedBackground.remove();
                editSection.remove();
            })
            editSection.appendChild(closeBtn);

            // Création de la secton qui contient les images de la galerie
            const editSectionGalerie = document.createElement('div');
            editSection.appendChild(editSectionGalerie);

            // Boucle pour la création des images
            for (let i=0; i < works.length; i++) {
                // Création de l'article qui comprendra tout les elements
                const galleryImg = document.createElement('article');
                galleryImg.classList.add('editGallery');
                galleryImg.setAttribute('id', i)
                editSectionGalerie.appendChild(galleryImg);
            
                // Ajout de l'image
                const img = document.createElement('img');
                img.src = works[i].imageUrl;
                img.classList.add('editImg');
                galleryImg.appendChild(img);
                
                // Ajout du bouton supprimer
                const deletBtn = document.createElement('button');
                deletBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                deletBtn.addEventListener('click', function(){
                    // Fonction pour supprimer le work dans la bdd
                    

                });
                deletBtn.classList.add('deletBtn');
                galleryImg.appendChild(deletBtn);
            };

            const addPictureBtn = document.createElement('button');
            addPictureBtn.classList.add('btn');
            addPictureBtn.classList.add('greenBtn');
            addPictureBtn.innerText = "Ajouter une photo";
            addPictureBtn.addEventListener('click', function(){

            })
            editSection.appendChild(addPictureBtn);
        });

    } else {
        // Modifie le boutton login
        loginBtn.innerText = "login";
        loginBtn.addEventListener('click', function(){
            location.href='./login.html';
        });
    };
};

isLoged();