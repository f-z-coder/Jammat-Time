import { useContext, useEffect } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import CurrentLocation from "../Current_Location/CurrentLocation";
import styles from "./Home.module.css";
import { Outlet, useLocation } from "react-router-dom";
import currentLocationContext from "../../contexts/currentLocation";
import markersContext from "../../contexts/markersContext";
import removeMultipleMarkers from "../../Map_function/removeMultipleMarkers";
function Home() {
  const { pathname } = useLocation();
  const [, setCurrentLocation] = useContext(currentLocationContext);
  const [markers, setMarkers] = useContext(markersContext);
  useEffect(() => {
    if (pathname === "/" && markers !== null) {
      removeMultipleMarkers(markers);
      setMarkers(null);
      setCurrentLocation(null);
    }
  }, [pathname, setCurrentLocation, markers, setMarkers]);

  return (
    <div className={styles.app}>
      <GoogleMap />
      <Outlet />

      <div className={styles.currentlocation}>
        <CurrentLocation />
      </div>
    </div>
  );
}

export default Home;
