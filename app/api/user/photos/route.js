import { NextResponse } from "next/server"
import {getPhotos} from 'lib/getPhotos';


export async function GET(request) {;
    const url = request.url;
    const params = new URLSearchParams(url.split('?')[1]);
    const photos = params.getAll('photos[]');
    const allFormattedPhotos = await getPhotos(photos).then(data => data).catch(err => console.log(err));
    return NextResponse.json({ formattedPhotos: allFormattedPhotos })
}