import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const libraries = ["places"];

function Map() {
  const [marker, setMarker] = useState({ lat: 18.407957, lng: 76.576767 });

  const { isLoaded, errorToLoad } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (errorToLoad) {
    return (
      <Alert severity="error">
        Sorry we can not fullfill your request right now{" "}
      </Alert>
    );
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{
        lat: 18.407957,
        lng: 76.576767,
      }}
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
    </GoogleMap>
  ) : (
    <Skeleton variant="rounded" width="100%" height="100%"></Skeleton>
  );
}
export default Map;
