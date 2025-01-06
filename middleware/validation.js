const Validate = require('../lib/validate');
const path = require('node:path');
const fs = require('node:fs');

const validation = (req, res, next) => {
    const file_path = path.resolve('data', 'users.json');
    const { name: na, email: em, password: ps } = req.body;

    const { name, email, password } = new Validate({
        email: em,
        password: ps,
        name: na,
    })._();

    if (name && email && password) {
        fs.readFile(file_path, 'utf-8', (err, data) => {
            if (!err) {
                let db = JSON.parse(data);
                const isTrue = db.users.some((data) => data.email === em);

                if (isTrue) {
                    res.status(401).json({
                        message:
                            '🚫 Email already exists. Please choose another.',
                    });
                } else {
                    next();
                }
            } else {
                res.status(404).json({
                    message: 'There was a problem in server side.',
                });
            }
        });
    } else {
        let invalids = [];
        if (!email) {
            invalids.push('⚠️ Incorrect email format. Try again.');
        }
        if (!password) {
            invalids.push(
                '⚠️ Password error. Your password must be at least 6-10 characters long, in uppercase and lowercase, and contain at least one symbol such as [!#$@%&?]. Please recheck.'
            );
        }

        if (!name) {
            invalids.push('🚫 Invalid name format.');
        }

        res.status(401).json({
            isTrue: false,
            message: invalids
        });
    }
};

module.exports = validation;
