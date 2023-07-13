import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import getCurrentLocation from "../../utils_function/getCurrentLocation.js";
import { useNavigate, useLocation } from "react-router-dom";
import currentLocationContext from "../../contexts/currentLocation.js";
import { useContext } from "react";
function CurrentLocation() {
  const navigate = useNavigate();
  const url = useLocation();
  const [, setCurrentLocation] = useContext(currentLocationContext);
  const handleClick = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      setCurrentLocation(currentLocation);
      if (url.pathname === "/nearbymosques") {
        navigate("/nearbymosques", { replace: true });
      } else {
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
