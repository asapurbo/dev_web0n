/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create auth method
 */

const fs = require('node:fs');
const path = require('node:path');

const auth = ({dir, auth}) => {
    return (req, res, next) => {
        const file_path = path.resolve(dir,'data', 'token.json');

        console.log(file_path);

        let T = req?.headers?.authorization?.split(' ')[1];

        if (auth) {
            fs.readFile(file_path, 'utf-8', (e, d) => {
                if (!e) {
                    let token_data = JSON.parse(d);

                    const isData = token_data.tokens.find(
                        (i) => i.tokenId === T
                    );

                    if (!!isData) {
                        if (isData.accessTime > Date.now()) {
                            next();
                        } else {
                            res.status(403).json({
                                isTrue: false,
                                message: 'Access time is over ⚠️⏱️',
                            });
                        }
                    } else {
                        res.status(403).json({
                            isTrue: false,
                            message: 'authorization error 🔒❌',
                        });
                    }
                } else {
                    res.status(403).json({
                        isTrue: false,
                        message: 'authorization error 🔒❌',
                    });
                }
            });
        } else {
            next();
        }
    };
};

module.exports = auth;
