import { useRef } from "react";
import styles from "./googleMap.module.css";
import useLoadMap from "../../customHooks/useLoadMap";
function GoogleMap() {
  const mapContainerELementRef = useRef(null);
  useLoadMap(mapContainerELementRef);
  return <div className={styles.googleMap} ref={mapContainerELementRef}></div>;
}

export default GoogleMap;
