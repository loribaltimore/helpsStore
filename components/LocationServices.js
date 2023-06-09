import MapContainer from 'components/MapContainer';

export default function LocationServices({setEntered, location, setCoord}) {
  
    return (
        <div className='z-10'>
            <MapContainer setEntered={setEntered} location={location} setCoord={setCoord} />
        </div>
    )
};