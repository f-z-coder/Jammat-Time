import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import NearbyPlace from "./NearbyPlace";
function Map({ isLoaded, errorToLoad }) {
  const [marker, setMarker] = useState({ lat: 18.407957, lng: 76.576767 });
  const [center, setCenter] = useState({ lat: 18.407957, lng: 76.576767 });
  console.log("marker position ", marker);

  if (errorToLoad) {
    return (
      <Alert severity="error">
        Sorry we can not fullfill your request right now
      </Alert>
    );
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "60vh" }}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
      }}
      onClick={(e) => {
        setMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      <MarkerF position={marker} />
      <NearbyPlace setMarker={setMarker} />
    </GoogleMap>
  ) : (
    <Skeleton variant="rounded" width="100%" height="100%"></Skeleton>
  );
}
export default Map;
