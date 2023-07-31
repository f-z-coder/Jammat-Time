import styles from "./map.module.css";
import GoogleMap from "../googleMap/GoogleMap";
import CurrentLocation from "../currentLocation/CurrentLocation";
function Map() {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.googleMapContainer}>
        <GoogleMap />
      </div>
      <div className={styles.currentlocation}>
        <CurrentLocation />
      </div>
    </div>
  );
}

export default Map;
