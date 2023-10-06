let axios = require('axios');
// let mongoose = require('mongoose');
// let { Schema, model } = mongoose;
// let { donationSchema } = mongoose;
// let Donation = model('donation', donationSchema);

let getQueue = async (currentPage) => {
    let response = await fetch(`/queue?offset=${(currentPage - 1) * 10}&limit=${((currentPage - 1) * 10) + 20}`, {
        method: 'get',
    }).then(data => {  return data.data }).catch(err => console.log(err));
    return response;
};

module.exports = getQueue;