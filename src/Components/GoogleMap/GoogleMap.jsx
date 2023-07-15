import { useRef } from "react";
import useLoadMap from "../../custom_hooks/useLoadMap";
function GoogleMap() {
  const mapContainerELementRef = useRef(null);
  useLoadMap(mapContainerELementRef);
  return (
    <div
      ref={mapContainerELementRef}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

export default GoogleMap;
