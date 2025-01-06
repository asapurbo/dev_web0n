/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create get method
 */

const fs = require('node:fs');
const store = require('../../utils/store');

const put = ({ req, res, data, path_name, file_path_users }) => {
    const dir = path_name.dir.split('/')[1];
    let yK = store.data[dir];

    let k = Object.keys(req.body);
    let s = [];

    k.forEach((i) => {
        if (!yK.includes(i)) s.push(i);
    });

    if (s.length > 0) {
        let U = 'Unexpected property is';
        for (let i = 0; i < s.length; i++) {
            U += ', ' + s[i];
        }

        let O = '. your required property is';

        for (let i = 0; i < yK.length; i++) {
            O += ', ' + yK[i];
        }

        res.status(403).json({
            message: U + O,
        });
    } else {
        fs.readFile(file_path_users, 'utf-8', (err, d) => {
            if (!err) {
                let kI = JSON.parse(d);

                let kA = kI[dir];

                let lJ = kA.some((i) => i.id === path_name.base);

                if (lJ) {
                    let P = kA.map((i) => {
                        if (path_name.base === i.id) {
                            return {
                                ...i,
                                ...req.body,
                            };
                        }
                        return i;
                    });

                    kI[dir] = P;

                    fs.writeFile(file_path_users, JSON.stringify(kI), (e) => {
                        if (!e) {
                            res.status(200).json({
                                isTrue: true,
                                message: 'Successful!🎉✅🚀',
                            });
                        } else {
                            res.status(200).json({
                                isTrue: false,
                                message:
                                    'There was a problem in server side! ❌',
                            });
                        }
                    });
                } else {
                    res.status(500).json({
                        isTrue: false,
                        message: 'unexpected URL ❌',
                    });
                }
            } else {
                res.status(500).json({
                    isTrue: false,
                    message: 'There was a problem in server side! ❌',
                });
            }
        });
    }
};

module.exports = put;
