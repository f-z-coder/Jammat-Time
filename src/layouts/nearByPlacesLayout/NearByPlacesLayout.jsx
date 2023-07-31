import useAddMarkers from "../../customHooks/useAddMarkers";
import BackButton from "../../components/backButton/BackButton";
import currentLocationContext from "../../contexts/currentLocation";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation";
import { useEffect, useCallback, useContext } from "react";
import styles from "./nearByPlacesLayout.module.css";
import { CircularProgress } from "@mui/material";
function NearByPlacesLayout() {
  const isMarkersAdded = useAddMarkers();
  const [currentLocationState, setCurrentLocationState] = useContext(
    currentLocationContext
  );
  const getLocation = useCallback(async () => {
    try {
      //this function run when user directly comes to /map/nearbyPlaces url without click location button means
      // currentLocationState is null
      if (currentLocationState === null) {
        const currentLocationOfUser = await getCurrentLocation();
        //changing the current location  if its null;
        setCurrentLocationState(currentLocationOfUser);
      }
    } catch (e) {
      throw Error(e.message);
    }
  }, [currentLocationState, setCurrentLocationState]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <div className={styles.nearByPlacesLayout}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      {!isMarkersAdded && (
        <div className={styles.progressBar}>
          <CircularProgress size={50} />
        </div>
      )}
    </div>
  );
}

export default NearByPlacesLayout;
