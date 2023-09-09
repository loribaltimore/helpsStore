"use client"
import {useContext, useRef, useEffect } from "react";
import {Map, MapStyle, geocoding, Marker, config} from '@maptiler/sdk';
import { RegistrationContext } from 'components/RegistrationContext';

config.apiKey = 'K34N8EzXnRm1QQbwcdOo';

export default function MapContainer({ location, setCoord, setIsLocation }) {
    const mapContainer = useRef(null);
    const { setEntered } = useContext(RegistrationContext);
    useEffect(() => {
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
        <div className="h-[40rem] w-[40rem] ml-[19.5%] mt-[8%] absolute bg-white rounded p-5 border border-black">
            <div ref={mapContainer} className="w-full h-3/4 p-5 border border-black"></div>
            <h1 className="text-slate-800 text-center py-2">Is this your address?</h1>
            <div className="flex p-5 w-1/2 mx-auto space-x-3">
                <button className="border border-black text-black p-2 rounded text-sm h-full w-1/2"
                onClick={() => setIsLocation(false)}
                >Correct</button>
                <button className="border border-black text-black p-2 rounded text-sm h-full w-1/2"
                    onClick={() => {
                        setIsLocation(false);
                        setEntered(false);
                    }}
                >Incorrect</button>
            </div>
        </div>
    )
}

//Finish registration