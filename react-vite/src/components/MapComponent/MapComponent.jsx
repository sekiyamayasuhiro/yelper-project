import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
    width: "400px",
    height: "400px",
};

function MapComponent({ lat, lng }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const center = useMemo(() => ({ lat, lng }), [lat, lng]);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default MapComponent;
