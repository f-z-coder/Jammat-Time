import styles from "./Home.module.css";
import GoogleMap from "../GoogleMap/GoogleMap";
import CurrentLocation from "../Current_Location/CurrentLocation";
import { Outlet, useOutlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import mapContext from "../../contexts/mapContext";
import markersContext from "../../contexts/markersContext";
import removeMultipleMarkers from "../../Map_function/removeMultipleMarkers";
function Home() {
  const markersDataRef = useContext(markersContext);
  const [map] = useContext(mapContext);
  const isNotnull = useOutlet(); //is null when child path not match any url(when path=/)
  let isNearByMosquesVisble = false;
  if (isNotnull) {
    /*show mosque location only when location is /nearbymosques means useContext is not null */
    isNearByMosquesVisble = true;
  }
  console.log(isNotnull, markersDataRef);
  useEffect(() => {
    if (isNotnull === null && markersDataRef.current !== null) {
      removeMultipleMarkers(markersDataRef.current);
      markersDataRef.current = null;
      map.setZoom(12);
    }
  }, [isNotnull, markersDataRef, map]);

  return (
    <div className={styles.app}>
      <GoogleMap />
      <div className={styles.currentlocation}>
        <CurrentLocation />
      </div>
      {isNearByMosquesVisble && <Outlet />}
    </div>
  );
}

export default Home;
