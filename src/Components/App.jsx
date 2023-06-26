// import Map from "./Map";
// import Search from "./Search";
// // import { useJsApiLoader } from "@react-google-maps/api";

// const libraries = ["places"];

import { useState } from "react";
import GoogleMap from "./GoogleMap";
import NearbyPlace from "./NearbyPlace";
function App() {
  // const { isLoaded, errorToLoad } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //   libraries,
  // });
  const [currentPosition, setCurrentPosition] = useState({
    lat: 18.408792,
    lng: 76.560387,
  });
  return (
    // <div>
    //   <div>{isLoaded && <Search />}</div>

    //   <Map isLoaded={isLoaded} errorToLoad={errorToLoad} />
    // </div>
    <>
      <GoogleMap currentPosition={currentPosition} />
      <NearbyPlace setCurrentPosition={setCurrentPosition} />
    </>
  );
}

export default App;
