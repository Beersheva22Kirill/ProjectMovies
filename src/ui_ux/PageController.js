export default class PageController{

    #totalPage;
    #interval;
    #callBackFn;
    #currentIndex;
    #parentID;

    constructor(parentId, callbackFn){
        this.#parentID = parentId;
        this.#callBackFn = callbackFn;
        this.#currentIndex = 1;
        
    }

    createPageController(totalPage,interval,currentPage){
        this.#totalPage = totalPage;
        this.#interval = interval;
        
        const parentElement = document.getElementById(this.#parentID);
        const startIndex = currentPage <= 4 ? 1 : currentPage - 4
        let finishIndex = currentPage <= 4 ? this.#interval : this.#interval + currentPage - 4
        finishIndex = finishIndex >= this.#totalPage ? this.#totalPage : finishIndex;
        let numberOfPage = [] 
            for (let index = startIndex; index < finishIndex; index++) {
                numberOfPage.push(index);    
            }
        parentElement.innerHTML = `<ul id = "${this.#parentID}-ul-id" class = "list-of-pages">
                                    <li id ="${this.#parentID}-previus-page-id" class = "item-of-pages" hidden>Previus</li>
                                    <li id = "${`${this.#parentID}-li-first`}" class = "item-of-pages" hidden>1 ..</li>
                                    ${numberOfPage.map((number) => 
                                        `<li id = "${this.#parentID}-li-number" class = "item-of-pages" >   
                                        ${number}
                                        </li>`).join('')}
                                    <li id = "${this.#parentID}-li-last" class = "item-of-pages">${this.#totalPage}</li> 
                                    <li id = "${this.#parentID}-next-page-id" class = "item-of-pages">Next</li>   
                                    </ul>`

        this.#setEventListener(startIndex);

    }

    #setEventListener(startIndex){
        document.getElementById(`${this.#parentID}-li-first`).hidden = startIndex > 1 ? false : true;
        const previusPage = document.getElementById(`${this.#parentID}-previus-page-id`);
        previusPage.hidden = this.#currentIndex == 1 ? true : false;
        const firstNumber = document.getElementById(`${this.#parentID}-li-first`);
        const list = document.getElementById(`${this.#parentID}-ul-id`).childNodes;
        const listNumbers = Array.from(list).filter(element => (element.id == `${this.#parentID}-li-number`))
        const lastNumber = document.getElementById(`${this.#parentID}-li-last`);
        const nextPage = document.getElementById(`${this.#parentID}-next-page-id`);
        
        listNumbers.forEach(item => {
            item.addEventListener('click', () => {
                this.#currentIndex = Number.parseInt(item.innerText);
                this.#callBackFn(this.#currentIndex)
            })
        }) 

        firstNumber.addEventListener('click', () => {
            this.#currentIndex = Number.parseInt(firstNumber.innerText);
            this.#callBackFn(this.#currentIndex)
        })

        lastNumber.addEventListener('click', () => {
            this.#currentIndex = Number.parseInt(lastNumber.innerText);
            this.#callBackFn(this.#currentIndex)
        })

        nextPage.addEventListener('click', () => {
            this.#currentIndex++
            this.#callBackFn(this.#currentIndex)
        })

        previusPage.addEventListener('click', () => {
            this.#currentIndex--
            this.#callBackFn(this.#currentIndex)
        })
        
    }

    hidePageController(){
        document.getElementById(this.#parentID).hidden = true;
    }

    openPageController(){
        document.getElementById(this.#parentID).hidden = false;
    }

}