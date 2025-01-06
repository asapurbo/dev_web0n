/**
 * author: Apurbo Howlader
 * date: 12/4/2024
 * description: create get method
 */


const get = ({res, data}) => {
    res.status(200).json({
        data
    });
}

module.exports = get;
