/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create get method
 **/

const fs = require('node:fs');
const path = require('node:path');
const store = require('../../utils/store');
const idCreator = require('../idCreator');

const post = ({ req, res, data, path_name, file_path_users }) => {
    let yK = store.data[path_name];

    let k = Object.keys(req.body);
    let s = [];

    yK.forEach((i) => {
        if (!k.includes(i)) s.push(i);
    });

    if (s.length > 0) {
        let U = 'Unexpected property, your required property is';
        for (let i = 0; i < s.length; i++) {
            U += ', ' + s[i];
        }

        res.status(403).json({
            message: U,
        });
    } else {
        fs.readFile(file_path_users, 'utf-8', (err, d) => {
            if (!err) {
                dT = JSON.parse(d);

                dT[path_name].push({
                    id: idCreator(),
                    ...req.body,
                });

                fs.writeFile(file_path_users, JSON.stringify(dT), (e) => {
                    if (!e) {
                        res.status(200).json({
                            isTrue: true,
                            message: 'Successful!🎉✅🚀',
                        });
                    } else {
                        res.status(500).json({
                            isTrue: false,
                            message: 'There was a problem in server side! ❌',
                        });
                    }
                });
            } else {
                res.status(500).json({
                    isTrue: false,
                    message: 'There was a problem in server side! ❌',
                });
            }
        });
    }
};

module.exports = post;
