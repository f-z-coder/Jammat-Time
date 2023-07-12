import { useState } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import NearByPlace from "../NearbyPlace/NearbyPlace";
import styles from "./App.module.css";
function App() {
  const [currentLocation, setCurrentLocation] = useState(null);

  const [placeDetails, setPlaceDetails] = useState(null);

  return (
    <div className={styles.app}>
      <GoogleMap
        currentLocation={currentLocation}
        setPlaceDetails={setPlaceDetails}
      />

      <div className={styles.currentlocation}>
        <NearByPlace setCurrentLocation={setCurrentLocation} />
      </div>
    </div>
  );
}

export default App;
