import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
    width: "100%",
    height: "100%",
};

function MapBusinessIndex({ businesses }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const center = useMemo(() => {
        if (!isLoaded) return { lat: 0, lng: 0 };

        const bounds = new window.google.maps.LatLngBounds();
        businesses.forEach((business) => {
            bounds.extend(
                new window.google.maps.LatLng(business.lat, business.lng)
            );
        });
        return bounds.getCenter();
    }, [businesses, isLoaded]);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {isLoaded &&
                businesses.map((business) => (
                    <Marker
                        key={business.id}
                        position={{ lat: business.lat, lng: business.lng }}
                        // title={business.price}
                    />
                ))}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default MapBusinessIndex;
