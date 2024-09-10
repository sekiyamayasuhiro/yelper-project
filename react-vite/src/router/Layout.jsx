import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
// import { LoadScript } from "@react-google-maps/api";
// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div className='app-container'>
            <ModalProvider>
                <Navigation />
                {isLoaded && <Outlet />}
                <Modal />
                <Footer />
            </ModalProvider>
        </div>

        // NOTE: Moved LoadScript to a higher level so the Google Maps API is loaded once and available throughout the app.
        // <LoadScript googleMapsApiKey={apiKey}>
        //     <ModalProvider>
        //         <Navigation />
        //         {isLoaded && <Outlet />}
        //         <Modal />
        //     </ModalProvider>
        // </LoadScript>
    );
}
