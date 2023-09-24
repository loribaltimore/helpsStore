let axios = require('axios');

let unlikeCharity = async (org, cause) => {
            console.log(cause);

    let response = await axios({
        method: 'put',
        url: 'http://localhost:3000/explore/charities/like',
        data: {
            org: org.name,
            cause
        }
    }).then(data => { return data }).catch(err => console.log(err));
    let { data } = response;
    return data;
};

module.exports = unlikeCharity;