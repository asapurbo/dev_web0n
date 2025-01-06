/**
 * author: Apurbo Howlader
 * date: 11/11/2024
 * description: create a sign up feature
 */

// dependencies
const fs = require('fs');
const path = require('node:path');
const idCreator = require('../../lib/idCreator');
const addToken = require('../../utils/addToken');
const bcrypt = require('bcryptjs');

// create function and work
const signup = (req, res) => {
    const file_path = path.resolve('data', 'users.json');

    fs.readFile(file_path, 'utf-8', async (err, data) => {
        if (!err) {
            const { name, password, email } = req.body ?? {};

            const hashPassword = await bcrypt.hash(password, 10);

            const userData = {
                name,
                password: hashPassword,
                email,
                id: idCreator(),
            };

            const dbData = JSON.parse(data);
            dbData.users.push(userData);

            fs.writeFile(file_path, JSON.stringify(dbData), 'utf-8', (err) => {
                if (!err) {
                    addToken(userData, (userInfo) => {
                        if (userInfo?.isTrue) {
                            res.json({
                                ...userInfo,
                                message:
                                    'Signup successful! 🎉✅🚀 Welcome aboard!',
                            });
                        } else {
                            res.json({
                                ...userInfo,
                            });
                        }
                    });
                } else {
                    res.json({
                        message: 'Signup failed. ❌ Please try again.',
                    });
                }
            });
        } else {
            res.json({
                message: 'There was problem in server side!',
            });
        }
    });
};

module.exports = signup;
