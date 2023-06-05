"use client"
import { useState, useRef, useEffect } from "react";
import {Map, MapStyle, geocoding, Marker} from '@maptiler/sdk';
    

export default function MapContainer(props) {
     const [location, setLocation] = useState(undefined);
    const mapContainer = useRef(null);
    
    const handleClick = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function success(pos) {
                const crd = pos.coords;
                //        const result = await geocoding.reverse([]);
                // console.log(result)
                    await fetch(`/api/user/location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lat: crd.latitude, lng: crd.longitude }),
                    }).then(async data => {
                        const res = await data.json();
                        setLocation([res.location.data[0].longitude, res.location.data[0].latitude]);
                    }).catch(err => console.log(err));
            })
        } else {
            console.log("NO LOCATION AVAILABLE")
        }
    };
    
    useEffect(() => {
        if (location) {
            const map = new Map({
            container: mapContainer.current,
            apiKey: 'K34N8EzXnRm1QQbwcdOo',
            center: location,
            zoom: 17,
            MapStyle: MapStyle.STREETS,
        });
        const marker = new Marker()
        .setLngLat({lng: location[0], lat: location[1]})
            .addTo(map);
        }
    }, [location])
    
    return (
        <div className="h-screen">
            <button
                onClick={async() => await handleClick()}
            >
                Get Location
            </button>
            <div ref={mapContainer} className="w-1/2 h-1/2"></div>
        </div>
        
    )
}