export default class HeandlerSection{

    #parentId;
    sections

    constructor(parentId,sections){
        this.#parentId = parentId;
        this.sections = [];
        this.#setSections(sections);  
    }

    #setSections(sections){
        const sectionsForInner = sections.map(element => 
            `<section id ="${this.#parentId}-section-${element}-id"></section>`).join('');

        const parentElement = document.getElementById(this.#parentId)
        parentElement.innerHTML = sectionsForInner;
        this.sections = Array.from(parentElement.childNodes)

    }

}