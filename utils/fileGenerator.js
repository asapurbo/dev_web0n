const store = require("./store");

function fileGenerator(data) {
    const split_on_new_line = data.split('\n').filter((i) => i !== '');
    // const split_data = data.split('=').map(i => i.trim())

    let schema = {};

    split_on_new_line.map((i) => {
        let main_data = i.split('=').map((i) => i.trim());

        if (main_data[1] && typeof main_data[1] === 'string') {
            let rgMatch = main_data[1].match(/\[(.*?)\]/)[1];

            D = rgMatch.split(',').map((i) => i.trim());

            Y = D.map((i) => {
                if (i.match(/\$.*/)) {
                    return i.split('$')[0];
                }
                return i;
            });

            schema[main_data[0]] = Y;
        }
    });

    store.data = schema;
    return schema;
}

// module export
module.exports = fileGenerator;
