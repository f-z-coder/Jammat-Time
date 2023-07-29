import styles from "./currentLocation.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation.js";
import currentLocationContext from "../../contexts/currentLocation.js";
function CurrentLocation() {
  const [currentLocationState, setCurrentLocationState] = useContext(
    currentLocationContext
  );
  const url = useLocation();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const currentLocationOfUser = await getCurrentLocation();
      if (
        currentLocationState === null ||
        currentLocationOfUser.lat !== currentLocationState.lat ||
        currentLocationOfUser.lng !== currentLocationState.lng
      ) {
        //changing the current location  if its null or its lag lat change
        setCurrentLocationState(currentLocationOfUser);
      }
      if (url.pathname === "/map") {
        //changing the url to show markers
        navigate("/map/nearbyplaces");
      }
    } catch (e) {
      throw Error(e.message);
    }
  };
  return (
    <button className={styles.locationButton} onClick={handleClick}>
      <MyLocationIcon />
    </button>
  );
}
export default CurrentLocation;
