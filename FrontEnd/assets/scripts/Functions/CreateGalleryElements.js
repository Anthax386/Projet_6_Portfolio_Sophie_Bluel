import {getWorksData} from "../Data/works.js"
import {empty} from "../Utils/emplyElement.js"

const $gallery = document.getElementById('gallery');

const works = await getWorksData();

export function createGaleryElement(filter){
    works.forEach(element => {
        const $figure = document.createElement('figure');
        $figure.innerHTML =  `
            <img src="${element.imageUrl}" alt=" ${element.title} ">
            </img><figcaption> ${element.title}</figcaption>
        `;
        $gallery.appendChild($figure);
    })
};

export async function getFilteredWorks(Category) {
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