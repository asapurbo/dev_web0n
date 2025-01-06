/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create get method
 */

const fs = require('node:fs')

function isAccess(paths, callBack) {
    const results = paths.map((i) => fs.existsSync(i));

    callBack(results)
}

module.exports = isAccess;
