import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate, useLocation } from "react-router-dom";
import getCurrentLocation from "../../utilsFunction/getCurrentLocation.js";
import { useContext } from "react";
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
      console.log(e);
    }
  };
  return (
    <IconButton onClick={handleClick}>
      <MyLocationIcon />
    </IconButton>
  );
}
export default CurrentLocation;
