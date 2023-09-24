let axios = require('axios');
let FormData = require('form-data');

let postProduct = async (img, name, price, cost, lead, timeIncrement) => {
    let form = new FormData();
    form.append('img', img);
    form.append('name', name);
    form.append('price', price);
    form.append('cost', cost);
    form.append('lead', lead * timeIncrement);
    console.log(form.entries())
    let response = await axios.post(
        'http://localhost:3000/products',
        form,
        {
            headers: {
                'Content-Type': 'mulitpart/form-data'
            }
        }
    ).then(data => {
        console.log(data.data);
        return data
    }).catch(err => console.log(err));
    let { data } = response;
    return data;
};

module.exports = postProduct;