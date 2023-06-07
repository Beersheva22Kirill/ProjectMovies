export default class Grid {

    #parentId;
    #callbackFn;
    #bodyElement;

    constructor(parentId,columns,callbackFn){
        this.#callbackFn = callbackFn;
        this.#parentId = parentId;
        this.#createTable(columns);
    }

    #createTable(columns){
       const parentElement = document.getElementById(this.#parentId);
        const table = `
        <H1 id = "${this.#parentId}-title-table-id" class = "title-table"></H1>
        <section id = "${this.#parentId}-table-section" class = "table_place">
        <table>
            <thead>
                <tr>
                    ${columns.map(element => `<td></td>`).join('')}
                </tr>
            </thead>
            <tbody id="${this.#parentId}-body-table" >
        </table>
        </section>`
        parentElement.innerHTML = table;  
        this.#bodyElement = document.getElementById(`${this.#parentId}-body-table`)
    }

    fillTable(imagesPath,array,array_over,array_id,title){
       document.getElementById(`${this.#parentId}-title-table-id`).innerHTML = `${title}`;
       this.#bodyElement.innerHTML = array.map((element,index) => 
                    this.#getRow(imagesPath[index],array_over[index],element,array_id[index])).join('')  
       this.#setEventListener();                 
    }
    
    #getRow(imagePath,text,element,id){
        const row = `<tr id = "${this.#parentId}-row-table-id" movie-id = "${id}" class = "row-table-content">
                            <td>
                                <image src = "${imagePath}" class = "poster-image">
                            </td>
                            <td class = "td-inforation">
                                ${element.map(el => el + "</br>").join('')}
                            </td>
                            <td class = "overview-table">${text}
                            </td>
                        </tr>`
        return row;
    }

    #setEventListener(){
        const rows = Array.from(this.#bodyElement.childNodes);
        rows.forEach(row => {
            row.addEventListener('click', () => {
                this.#callbackFn(row.attributes[1].value)
            })
        })
        

    }


}