export function createElementFromTemplate(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.children[0];
}

export function mountTo(containter, element) {
    containter.innerHTML = '';
    containter.append(element);
}