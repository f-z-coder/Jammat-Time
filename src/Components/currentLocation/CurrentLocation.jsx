import styles from "./currentLocation.module.css";
import { CircularProgress } from "@mui/material";
import Toast from "../toast/Toast";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation.js";
import currentLocationContext from "../../contexts/currentLocation.js";
import mapContext from "../../contexts/mapContext";
function CurrentLocation() {
  const [currentLocationState, setCurrentLocationState] = useContext(
    currentLocationContext
  );
  const [map] = useContext(mapContext);
  const url = useLocation();
  const navigate = useNavigate();
  //this state is used to show loader when current location is fetching
  const [isLocationGet, setIsLocationGet] = useState(true);

  const [toastDetails, setToastDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleClick = async () => {
    //close toast if open
    if (toastDetails.open) {
      setToastDetails({
        open: false,
        message: "",
        severity: "success",
      });
    }
    try {
      setIsLocationGet(false);
      const currentLocationOfUser = await getCurrentLocation();
      setIsLocationGet(true);
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
      } else if (map !== null) {
        map.panTo(currentLocationState);
        map.setZoom(14);
      }
    } catch (e) {
      setIsLocationGet(true);
      //open toast on error
      setToastDetails({
        open: true,
        message: e.message,
        severity: "error",
      });
      throw Error(e.message);
    }
  };
  return (
    <>
      {toastDetails.open && <Toast toastDetails={toastDetails} />}

      <button className={styles.locationButton} onClick={handleClick}>
        {isLocationGet ? <MyLocationIcon /> : <CircularProgress />}
      </button>
    </>
  );
}
export default CurrentLocation;
