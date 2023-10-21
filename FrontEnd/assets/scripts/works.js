export async function getData(){
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    return works;
};

const tous = document.getElementById('tous');
const objets = document.getElementById('objects');
const appartements = document.getElementById('appartements');
const hotels = document.getElementById('hotels');
const gallery = document.getElementById('gallery');

function empty(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    };
};

async function getAllWorks() {
    const works = await getData();
    console.log(works);

    empty(gallery);

    for (let i=0; i < works.length; i++) {
        const figure = document.createElement('figure');
        gallery.appendChild(figure);
    
        const img = document.createElement('img');
        img.src = works[i].imageUrl;
        figure.appendChild(img);
        
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = works[i].title;
        figure.append(figcaption);
    };
};

getAllWorks();

async function getFilteredWorks(Category) {
    const works = await getData();
    const result = works.filter((work) =>work.categoryId === Category);
    console.log(result);

    empty(gallery);
    for (let i=0; i < result.length; i++) {
        
        const figure = document.createElement('figure');
        gallery.appendChild(figure);
    
        const img = document.createElement('img');
        img.src = result[i].imageUrl;
        figure.appendChild(img);
        
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = result[i].title;
        figure.append(figcaption);
    };
};

tous.addEventListener("click", async function(){
    getAllWorks();
    objets.classList.remove('greenBtn');
    appartements.classList.remove('greenBtn');
    hotels.classList.remove('greenBtn');
    tous.classList.add('greenBtn');
});
objets.addEventListener("click", async function(){
    getFilteredWorks(1);
    tous.classList.remove('greenBtn');
    appartements.classList.remove('greenBtn');
    hotels.classList.remove('greenBtn');
    objets.classList.add('greenBtn');
});
appartements.addEventListener("click", async function(){
    getFilteredWorks(2);
    tous.classList.remove('greenBtn');
    objets.classList.remove('greenBtn');
    hotels.classList.remove('greenBtn');
    appartements.classList.add('greenBtn');
});

hotels.addEventListener("click", async function(){
    getFilteredWorks(3);
    tous.classList.remove('greenBtn');
    objets.classList.remove('greenBtn');
    appartements.classList.remove('greenBtn');
    hotels.classList.add('greenBtn');
});