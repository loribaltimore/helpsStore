"use client"
import { useState, useRef, useEffect } from "react";
import {Map, MapStyle, geocoding, Marker, config} from '@maptiler/sdk';
    
config.apiKey = 'K34N8EzXnRm1QQbwcdOo';

export default function MapContainer({ setEntered, location, setCoord }) {
    const mapContainer = useRef(null);
    
    useEffect(() => {
console.log(location)
        const asyncWrapper = async () => {
            let finalLoc = location;
            if (typeof location === 'string') {
                const result = await geocoding.forward(location);
                finalLoc = result.features[0].geometry.coordinates;
            };
            setTimeout(() => {
                const map = new Map({
                    container: mapContainer.current,
                    apiKey: 'K34N8EzXnRm1QQbwcdOo',
                    center: finalLoc,
                    zoom: 17,
                    MapStyle: MapStyle.STREETS,
                });
                const marker = new Marker()
                    .setLngLat({ lng: finalLoc[0], lat: finalLoc[1] })
                    .addTo(map);
            }, 500);
            setCoord(finalLoc);
        };

        asyncWrapper();
        
    }, [location])

    return (
        <div className="h-[40rem] w-[40rem] ml-[19.5%] absolute bg-white rounded-lg p-5">
            <div ref={mapContainer} className="w-full h-3/4 p-5"></div>
            <h1 className="text-slate-800 text-center py-2">Is this your address?</h1>
            <div className="flex p-5 w-1/2 mx-auto space-x-3">
                <button className="bg-indigo-500 p-2 rounded text-sm h-full w-1/2"
                onClick={() => setEntered('good')}
                >Correct</button>
                <button className="bg-indigo-500 p-2 rounded text-sm h-full w-1/2"
                    onClick={() => setEntered(false)}
                >Incorrect</button>
            </div>
        </div>
        
    )
}