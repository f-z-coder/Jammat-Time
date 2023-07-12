import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import getCurrentLocation from "../../utils_function/getCurrentLocation.js";
function NearByPlace({ setCurrentLocation }) {
  const handleClick = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      setCurrentLocation(currentLocation);
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
export default NearByPlace;
