import useAddMarkersOnNearbyPlaces from "../../customHooks/useAddMarkersOnNearbyPlaces";
import BackButton from "../../components/backButton/BackButton";
import currentLocationContext from "../../contexts/currentLocation";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation";
import { useEffect, useCallback, useContext, useState } from "react";
import styles from "./nearByPlacesLayout.module.css";
import { CircularProgress } from "@mui/material";
function NearByPlacesLayout() {
  const isMarkersAdded = useAddMarkersOnNearbyPlaces();
  const [currentLocationState, setCurrentLocationState] = useContext(
    currentLocationContext
  );
  //this state is used to show loader when current location is fetching
  const [isLocationGet, setIsLocationGet] = useState(true);

  const getLocation = useCallback(async () => {
    try {
      //this function run when user directly comes to /map/nearbyPlaces url without click location button means
      // currentLocationState is null
      if (currentLocationState === null) {
        setIsLocationGet(false);
        const currentLocationOfUser = await getCurrentLocation();
        //changing the current location  if its null;
        setIsLocationGet(true);
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
      {!isMarkersAdded && isLocationGet && (
        <div className={styles.progressBar}>
          <CircularProgress size={50} />
        </div>
      )}
    </div>
  );
}

export default NearByPlacesLayout;
