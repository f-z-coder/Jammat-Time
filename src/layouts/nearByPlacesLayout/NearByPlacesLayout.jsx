import useAddMarkers from "../../customHooks/useAddMarkers";
import BackButton from "../../components/backButton/BackButton";
import currentLocationContext from "../../contexts/currentLocation";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation";
import { useEffect, useCallback, useContext } from "react";
function NearByPlacesLayout() {
  useAddMarkers();
  const [currentLocationState, setCurrentLocationState] = useContext(
    currentLocationContext
  );
  const getLocation = useCallback(async () => {
    try {
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
    <div>
      <BackButton />
    </div>
  );
}

export default NearByPlacesLayout;
