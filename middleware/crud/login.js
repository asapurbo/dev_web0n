/**
 * author: Apurbo Howlader
 * date: 11/11/2024
 * description: create a login feature
 */

// dependencies
const Validate = require('../../lib/validate');
const path = require('node:path');
const fs = require('node:fs');
const bcrypt = require('bcryptjs');
const idCreator = require('../../lib/idCreator');

const login = (req, res) => {
    const file_path_users = path.resolve('data', 'users.json');
    const file_path_token = path.resolve('data', 'token.json');

    const { email: em, password: pw } = req.body;
    const { email, password } = new Validate({
        password: pw,
        email: em,
    })._();

    if (email && password) {
        fs.readFile(file_path_users, 'utf-8', async (err, data) => {
            if (!err) {
                const dbData = JSON.parse(data);
                const user = dbData.users.find((i) => i.email === em);

                if (!!user) {
                    const isTrueHashPassword = await bcrypt.compare(
                        pw,
                        user?.password
                    );

                    if (isTrueHashPassword) {
                        fs.readFile(file_path_token, 'utf-8', (err, data) => {
                            if (!err) {
                                const tokenDBData = JSON.parse(data);

                                const updateToken = tokenDBData.tokens.map(
                                    (q) => {
                                        if (q.id === user.id) {
                                            return {
                                                ...q,
                                                tokenId: idCreator(25),
                                                accessTime:
                                                    Date.now() +
                                                    (24 * 60 * 60 * 1000),
                                            };
                                        }
                                        return q;
                                    }
                                );

                                tokenDBData.tokens = updateToken;

                                fs.writeFile(
                                    file_path_token,
                                    JSON.stringify(tokenDBData),
                                    'utf-8',
                                    (err) => {
                                        if (!err) {
                                            const T = updateToken.filter(
                                                (i) => i.id === user.id
                                            );

                                            return res.status(200).json({
                                                ...T[0],
                                                password: '*****',
                                                accessTime: '*****',
                                                id: '*****',
                                            });
                                        } else {
                                            return res.status(401).json({
                                                message:
                                                    'Login failed. ❌ Invalid credentials.',
                                                error: true,
                                            });
                                        }
                                    }
                                );
                            }
                        });
                    } else {
                        return res.status(401).json({
                            message: 'Login failed. ❌ Invalid credentials.',
                            error: true,
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: 'Login failed. ❌ Invalid credentials.',
                        error: true,
                    });
                }
            } else {
                return res.status(401).json({
                    message: 'Login failed. ❌ Invalid credentials.',
                    error: true,
                });
            }
        });
    } else {
        return res.status(401).json({
            message: 'Login failed. ❌ Invalid credentials.',
            error: true,
        });
    }
};

module.exports = login;
