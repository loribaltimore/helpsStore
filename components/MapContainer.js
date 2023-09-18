"use client"
import {useContext, useRef, useEffect, useState } from "react";
import {Map, MapStyle, geocoding, Marker, config} from '@maptiler/sdk';
import { RegistrationContext } from 'components/RegistrationContext';

config.apiKey = 'K34N8EzXnRm1QQbwcdOo';

import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "@maptiler/geocoding-control/style.css";



const gc = new GeocodingControl({country: 'us', language: 'en', responseType: 'json'});

export default function MapContainer({ location, setCoord, setIsLocation }) {
    const [currentAddress, setCurrentAddress] = useState(undefined);
    gc.addEventListener('response', (event) => {
        console.log(event.detail.featureCollection.features[0].center);
        setCoord(event.detail.featureCollection.features[0].center);
        console.log(event.detail.featureCollection.features[0].place_name)
        setCurrentAddress(event.detail.featureCollection.features[0].place_name)
    })
    const mapContainer = useRef(null);
    const { setEntered } = useContext(RegistrationContext);

    useEffect(() => {
        const asyncWrapper = async () => {
            setTimeout(() => {
                const map = new Map({
                    container: mapContainer.current,
                    apiKey: 'K34N8EzXnRm1QQbwcdOo',
                    center: [-105.2705, 40.0150],
                    zoom: 5,
                    MapStyle: MapStyle.STREETS,
                }).addControl(gc);

            }, 500);
        };
        asyncWrapper();
    }, [location])

    return (
        <div className="h-[20rem] space-y-3  rounded border border-black">
            <div ref={mapContainer} className="w-full h-3/4 p-5 border border-black"></div>
            <div className=" flex w-3/4 mx-auto">
                <div className="w-1/2">
                    <p className="text-black text-sm">{currentAddress}</p>
                </div>
                <button className="block mx-auto border border-black text-black p-3 rounded text-sm h-full hover:ring ring-[#02F3B0] ring-inset"
                    onClick={() => setEntered(true)}
                >Set Address</button>
            </div>
        </div>
    )
}

//Finish registration