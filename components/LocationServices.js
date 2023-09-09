import MapContainer from 'components/MapContainer';

export default function LocationServices({location, setCoord, setIsLocation}) {
    return (
        <div className='z-10 border'>
            <MapContainer
                location={location}
                setCoord={setCoord}
                setIsLocation={setIsLocation}
            />
        </div>
    )
};