import {getWorksData} from "../Data/works.js"
import {empty} from "../Utils/emplyElement.js"

const $gallery = document.getElementById('gallery');

export async function createGaleryElement(){
    const works = await getWorksData();
    works.forEach(element => {
        const $figure = document.createElement('figure');
        $figure.innerHTML =  `
            <img src="${element.imageUrl}" alt=" ${element.title} ">
            </img><figcaption> ${element.title}</figcaption>
        `;
        $gallery.appendChild($figure);
    })
    console.log('coucou')
};

export async function getFilteredWorks(Category) {
    const works = await getWorksData();
    const result = works.filter((work) =>work.categoryId === Category);

    empty($gallery);
    result.forEach(element =>{
        const figure = document.createElement('figure');
        figure.innerHTML =  `
            <img src="${element.imageUrl}" alt=" ${element.title} ">
            </img><figcaption> ${element.title}</figcaption>
        `;
        $gallery.appendChild(figure);
    })
};