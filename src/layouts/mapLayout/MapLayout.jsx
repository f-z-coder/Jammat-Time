import styles from "./mapLayout.module.css";
import GoogleMap from "../../components/googleMap/GoogleMap";
import CurrentLocation from "../../components/currentLocation/CurrentLocation";
import { Outlet } from "react-router-dom";
function MapLayout() {
  return (
    <div className={styles.mapLayout}>
      <div className={styles.googleMapContainer}>
        <GoogleMap />
      </div>
      <div className={styles.currentlocation}>
        <CurrentLocation />
      </div>
      {/* Display NearByPlacesLayout when path is "/map/nearbyplaces" */}
      <Outlet />
    </div>
  );
}

export default MapLayout;
