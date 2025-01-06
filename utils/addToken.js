const path = require('node:path');
const fs = require('node:fs');
const idCreator = require('../lib/idCreator');

const addToken = (userData, callback) => {
    const file_path = path.resolve('data', 'token.json');

    fs.readFile(file_path, 'utf-8', (err, data) => {
        if (!err) {
            let id = idCreator(25)

            let dbData = JSON.parse(data)
            let tokenObj = {
                ...userData,
                tokenId: id,
                accessTime: Date.now() + (24 * 60 * 60 * 1000)
            }

            dbData.tokens.push(tokenObj)

            fs.writeFile(file_path, JSON.stringify(dbData), 'utf-8', (err) => {

                if(!err) {
                    callback({
                        ...tokenObj,
                        password: '*****',
                        accessTime: '*****',
                        id: '*****',
                        isTrue: true,
                    })
                } else {
                    callback({
                        message: 'Signup failed. ❌ Please try again.',
                        isTrue: false,
                    })
                }
            })
        }
    });
};

module.exports = addToken;
