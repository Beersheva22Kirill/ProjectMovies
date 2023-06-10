const ACTIVE = 'active'
export default class ApplicationMenu {
    
    #activeIndex;
    #buttons;
    #callbackFn;
    #parentId;

    constructor (parentId,buttons,callBackFn){
        this.#parentId = parentId;
        this.#callbackFn = callBackFn;
        this.#createButtons(buttons);
        this.#setEvents();
    }

    #createButtons(buttons){
        const parentSection = document.getElementById(this.#parentId);
        const buttonsForInner = buttons.map((name,index) => 
                `<button id ="${this.#parentId}-menu-button-${index}" class = "buttons-menu">${name}</button>`).join('')
        parentSection.innerHTML = buttonsForInner;
        this.#buttons = parentSection.childNodes;
    }

    #setEvents(){
        this.#buttons.forEach((button,index) => 
                button.addEventListener('click', this.#buttonHendler.bind(this,index)));
    }

    #buttonHendler(index){
        if(index != this.#activeIndex){
            if(this.#activeIndex != undefined){
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);  
            }  
        }
        this.#activeIndex = index;
        this.#buttons[this.#activeIndex].classList.add(ACTIVE);
        this.#callbackFn(this.#activeIndex);
    }

    getActivIndex(){
        return this.#activeIndex;
    }

}