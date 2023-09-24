import { NextResponse } from "next/server";

export async function GET(request, res) {
    let response = await fetch(`https://partners.every.org/v0.2/search/${res.params.searchTerm[0]}?apiKey=${process.env.CHARITY_API_KEY}`,
        {
        method: 'get',
        }).then(async data => { data = await data.json(); return data.nonprofits }).catch(err => console.log(err))
    
    return NextResponse.json({ searchResults: response });

}