/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create get method
 */

const path = require('node:path');
const fs = require('node:fs');
const isAccess = require('../utils/isAccess');
const fileGenerator = require('../utils/fileGenerator');

// dbshData
let dbshData = [null, { tokens: [] }, { users: [] }];

const isKey = ({dir}) => {

    const config = path.resolve(dir, 'info.config');

    const dbFile = path.resolve(dir, 'data', 'db.json');
    const tokenFile = path.resolve(
        dir,
        'data',
        'token.json'
    );

    const usersFile = path.resolve(
        dir,
        'data',
        'users.json'
    );

    fs.readFile(config, 'utf-8', (err, data) => {
        if (!err && data) {
            let schema = fileGenerator(data)

            dbshData[0] = schema;

            const folderPath = path.join(dir, 'data');

            isAccess([dbFile, tokenFile, usersFile], (data) => {
                let isTrue = data.every((i) => i === true);

                if (!isTrue) {
                    if (!fs.existsSync(folderPath)) {
                        fs.mkdirSync(folderPath, { recursive: true });
                    }
                    // file count
                    let f = 1;

                    [dbFile, tokenFile, usersFile].forEach((path, index) => {
                        fs.open(path, 'w+', (err, fd) => {
                            if (!err) {
                                fs.write(
                                    fd,
                                    JSON.stringify(dbshData[index]),
                                    (err) => {
                                        if (!err) {
                                            console.log(
                                                fs.close()
                                                `${f++} file successfully create!`
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    });
                }
            });
        } else {
            console.log('"info.config" file in not created or not create info!');
        }
    });
};

module.exports = isKey;
