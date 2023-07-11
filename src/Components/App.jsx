import { useState } from "react";
import GoogleMap from "./GoogleMap";
import NearbyPlace from "./NearbyPlace";
import Place from "./Place";
import "./Base.module.css";
function App() {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 18.408792,
    lng: 76.560387,
  });

  const [placeDetails, setPlaceDetails] = useState(null);

  return (
    <>
      <GoogleMap
        currentPosition={currentPosition}
        setPlaceDetails={setPlaceDetails}
      />
      <NearbyPlace setCurrentPosition={setCurrentPosition} />
      {placeDetails && <Place placeDetails={placeDetails} />}
    </>
  );
}

export default App;
