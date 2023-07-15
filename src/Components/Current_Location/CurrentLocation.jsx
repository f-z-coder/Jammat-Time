import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate, useLocation } from "react-router-dom";
import getCurrentLocation from "../../utils_function/getCurrentLocation.js";
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
        setCurrentLocationState(currentLocationOfUser);
      }
      if (url.pathname === "/") {
        navigate("/nearbymosques");
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
