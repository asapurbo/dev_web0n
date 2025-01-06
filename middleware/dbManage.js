/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create db manage middleware
 */

const path = require('path');
const fs = require('node:fs');
const get = require('../lib/methods/get');
const post = require('../lib/methods/post');
const put = require('../lib/methods/put');
const deleted = require('../lib/methods/deleted');

const dbManage = (req, res) => {
    const path_name = path.parse(req.path);
    const file_path_users = path.resolve('data', 'db.json');

    fs.readFile(file_path_users, 'utf-8', (err, data) => {
        if (!err && data) {
            const user_data = JSON.parse(data);
            let pn = path_name.dir.split('/')

            if (user_data[pn[1]] || user_data[path_name.base]) {
                let method = ['get', 'post', 'put', 'delete'];

                if (method.includes(req.method.toLowerCase()) > -1) {
                    switch (req.method.toLowerCase()) {
                        case 'get':
                            get({req, res, data: user_data[path_name.base],});
                            break;
                        case 'post':
                            post({req, res, data: user_data[pn[1]], path_name: path_name.base, file_path_users});
                            break;
                        case 'put':
                            put({req, res, data: user_data[pn[1]], path_name, file_path_users});
                            break;
                        case 'delete':
                            deleted({req, res, data: user_data, path_name, file_path_users});
                            break;

                        default:
                            res.status(500).json({
                                message: 'Method error!',
                            });
                    }
                } else {
                    res.status(500).json({
                        message: 'Method error!',
                    });
                }
            } else {
                res.status(403).json({
                    message: 'URL was not found',
                });
            }
        } else {
            res.status(500).json({
                message: 'There was problem in server side!',
            });
        }
    });
};

module.exports = dbManage;
