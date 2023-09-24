let axios = require('axios');

let charityByName = async (req, res, next) => {
    let { charityName } = req.params;
    let response = await axios({
        method: 'get',
        url: `https://partners.every.org/v0.2/nonprofit/${charityName}?apiKey=${process.env.CHARITY_API_KEY}`
    }).then(data => { console.log(data); return data }).catch(err => console.log(err));
    let { data } = response;
    return data;
};

module.exports = charityByName;