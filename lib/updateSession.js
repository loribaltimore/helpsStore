
let updateSession = async (userId, value, item) => {
    let response = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            value,
            item
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async data => { return await data.json() }).catch(err => console.log(err));
    return response;
};
module.exports = updateSession;