let axios = require('axios');

let unlikeCharity = async (org, cause) => {
            console.log(cause);

    let response = await fetch('/explore/charities/like', {
        method: 'put',
        body: {
            org: org.name,
            cause
        }
    }).then(data => { return data }).catch(err => console.log(err));
    let { data } = response;
    return data;
};

module.exports = unlikeCharity;