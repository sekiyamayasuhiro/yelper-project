import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
    width: "400px",
    height: "400px",
};

// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = ({ lat, lng }) => {
    const center = useMemo(() => ({ lat, lng }), [lat, lng]);
    return (
        // <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
        </GoogleMap>
        // </LoadScript>
    );
};

export default MapComponent;
