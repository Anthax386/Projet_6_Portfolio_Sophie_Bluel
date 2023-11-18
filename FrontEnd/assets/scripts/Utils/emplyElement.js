export function empty(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    };
};

