
let likeCharity = async (id, org, cause) => {
    let response = await fetch('http://localhost:3000/api/explore/charities/like', {
        method: 'post',
         body: JSON.stringify({
            id,
             org,
            cause
         }),
        headers: {
            'Content-Type': 'application/json'
         }
    }).then(async data => {   return await data.json() }).catch(err => console.log(err));
    return response;
};

module.exports = likeCharity;