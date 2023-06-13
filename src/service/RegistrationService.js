export default class RegistrationService{

    #URL;
   
    constructor(URL) {
        this.#URL = URL;  
    }

    async addUser(user) {
        
        return fetch(this.#URL,{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json())     
    }

    updateUser(user){
        const URL = `${this.#URL}/${user.id}`;
        fetch(URL,{
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        })
    }

    async getAllUsers () {
            return await fetch(this.#URL).then(response => response.json())
    }

    async getUserByID(id){
       const url_id = `${this.#URL}/${id}`;
            return await fetch(url_id).then(response => response.json())
    }

    async getUserByName(name){
            const url_name = `${this.#URL}?username=${name}`;
            const response = await fetch(url_name);
            const user = await response.json()

        return user;
        
    }

    async logInUser(username,password){
            const url_valid = `${this.#URL}?username=${username}&password=${password}`
            const response = await fetch(url_valid);
            const user = await response.json()
        return user;
    }

}