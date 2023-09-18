import MapContainer from 'components/MapContainer';

export default function LocationServices({location, setCoord, setIsLocation}) {
    return (
        <div className=''>
            <MapContainer
                location={location}
                setCoord={setCoord}
                setIsLocation={setIsLocation}
            />
        </div>
    )
};