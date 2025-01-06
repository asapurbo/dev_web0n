const idCreator = (num = 12) => {
    let isTrue = typeof num === 'number' && num > 0 ? true : false
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let id = ''


    if(isTrue) {
        for(let a = 0; a <= num; a++) {
            id += letters.charAt(Math.floor(Math.random() * letters.length))
        }
    }

    return id
}

module.exports = idCreator
