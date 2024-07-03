import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const MapComponent = ({ lat, lng }) => {
    const center = useMemo(() => ({ lat, lng }), [lat, lng]);

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            {/* <Marker
                position={center}
                icon={markerIcon}
                onLoad={() => console.log("Marker loaded.")}
            /> */}
        </GoogleMap>
    );
};

export default MapComponent;
