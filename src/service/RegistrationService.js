export default class RegistrationService{

    #mainUrl;
   
    constructor(URL) {
        this.#mainUrl = URL;  
    }

    addUser(user) {

        return new Promise(async resolved => { 
            return resolved(fetch(this.#mainUrl,{
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(user)
            }).then(response => response.json())) 
        })
    }
}