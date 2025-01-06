/**
 * author: Apurbo Howlader
 * date: 12/10/2024
 * description: create get method
 */

const fs = require('node:fs');

const deleted = ({ res, data, path_name, req, file_path_users }) => {
    let read_data = { ...data };
    let C = read_data[path_name.base].some((i) => i.id === req.body.id);

    if (C) {
        let filter_data = read_data[path_name.base].filter(
            (i) => !(i.id === req.body.id)
        );

        read_data[path_name.base] = filter_data;

        fs.writeFile(file_path_users, JSON.stringify(read_data), (err, d) => {
            if (!err) {
                return res.status(200).json({
                    message: 'Deleted Successful!🎉✅🚀',
                });
            } else {
                return res.status(500).json({
                    isTrue: false,
                    message: 'There was a problem in server side! ❌',
                });
            }
        });
    } else {
        return res.status(500).json({
            isTrue: false,
            message: 'ID is not able ❌',
        });
    }
};

module.exports = deleted;
