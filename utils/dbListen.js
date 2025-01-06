/**
 * author: Apurbo Howlader
 * date: 12/7/2024
 * description: create a crud feature
 */

const fileGenerator = require('../utils/fileGenerator');
const path = require('path');
const fs = require('fs');
const arraysAreEqual = require('./arraysAreEqual');


function dbListen({ dir }) {
    const folderPath = path.join(dir, 'data');

    if (fs.existsSync(folderPath)) {
        const dbFile = path.resolve(dir, 'data', 'db.json');
        const config = path.resolve(dir, 'info.config');

        fs.readFile(config, 'utf-8', (err, data) => {
            if (!err) {
                const schema = fileGenerator(data);

                let C = Object.entries(schema);

                let d = C.map((i) => {
                    return i[0];
                });

                let insideStorePath = path.join(__dirname, 'insideStore.json');
                let dbPath = path.join(dir, 'data', 'db.json');

                fs.readFile(insideStorePath, 'utf-8', (err, data) => {
                    if (!err) {
                        if (!arraysAreEqual(JSON.parse(data).data, d)) {
                            fs.writeFile(
                                insideStorePath,
                                JSON.stringify({ data: d }),
                                (err) => {
                                    if (!err) {
                                        function difference(a, b) {
                                            return [...a].filter(
                                                (item) => !b.includes(item)
                                            );
                                        }

                                        const a = [...d];
                                        const b = [...JSON.parse(data).data];

                                        const result = difference(a, b);

                                        fs.readFile(
                                            dbPath,
                                            'utf-8',
                                            (err, data) => {
                                                if (!err) {
                                                    const lD = JSON.parse(data);

                                                    result.forEach(
                                                        (i) =>
                                                            (lD[i] = schema[i])
                                                    );

                                                    fs.writeFile(
                                                        dbFile,
                                                        JSON.stringify(lD),
                                                        (err) => {
                                                            if (!err) {
                                                                console.log(
                                                                    'successful!'
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                });
            } else {
                return console.log('config file not found!');
            }
        });
    }
}

module.exports = dbListen;
