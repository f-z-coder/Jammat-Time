import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function NearbyPlace({ setCurrentPosition }) {
  const handleLocation = () => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Do something with the location data, e.g. display on a map

          console.log(`Latitude: ${lat}, longitude: ${lng}`);
          setCurrentPosition({ lat, lng });
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (
    <IconButton onClick={handleLocation}>
      <MyLocationIcon />
    </IconButton>
  );
}
export default NearbyPlace;
