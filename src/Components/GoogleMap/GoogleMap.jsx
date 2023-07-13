import { useRef, useEffect, useContext } from "react";
import useLoadMap from "../../custom_hooks/useLoadMap";
import currentLocationContext from "../../contexts/currentLocation";
function GoogleMap() {
  const mapContainerELementRef = useRef(null);
  const map = useLoadMap(mapContainerELementRef);
  const [currentLocation] = useContext(currentLocationContext);
  useEffect(() => {
    if (map != null && currentLocation !== null) {
      map.panTo(currentLocation);
      map.setZoom(10);
    }
  }, [currentLocation, map]);

  return (
    <div
      ref={mapContainerELementRef}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

export default GoogleMap;
