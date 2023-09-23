import { NextResponse } from "next/server";
 
export async function GET(request, res) {
    let { cause } = res.params;
    // let { currentPage } = request.query;
    let response = await fetch(`https://partners.every.org/v0.2/browse/${cause}?apiKey=${process.env.CHARITY_API_KEY}`,
{
        method: 'get',
        params: {
            take: '100',
    },
    headers: {
        'Content-Type': 'application/json'
    }
        }).then(async data => {  data = await data.json(); return data }).catch(err => console.log(err));
    console.log(response)
    return NextResponse.json(response);
}
