// create validation calss
class Validate {
    #name
    #number
    #password
    #email
    constructor({name, number, password, email}) {
        this.#name = name
        this.#number = number
        this.#password = password
        this.#email = email
    }

    _() {
        let Q = {}
        if(this.#name) {
            Q.name = typeof(this.#name) === 'string' && this.#name.trim().length > 0 ? true : false
        }

        if(this.#number) {
            Q.number = this.#number.match(/^(\+88)?01[1-9]\d{8}/gi) ? true : false
        }

        if(this.#email) {
            Q.email = this.#email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) ? true : false
        }

        if(this.#password) {
            Q.password = this.#password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{6,10}$/) ? true : false
        }

        return Q
    }
}

module.exports = Validate;
