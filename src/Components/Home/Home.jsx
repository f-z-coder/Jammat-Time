import styles from "./Home.module.css";
import GoogleMap from "../GoogleMap/GoogleMap";
import CurrentLocation from "../Current_Location/CurrentLocation";
import { Outlet, useOutlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import markersContext from "../../contexts/markersContext";
import removeMultipleMarkers from "../../Map_function/removeMultipleMarkers";
function Home() {
  const [markers, setMarkers] = useContext(markersContext);
  const isNotnull = useOutlet(); //is null when child path not match any url(when path=/)
  let isNearByMosquesVisble = false;
  if (isNotnull) {
    /*show mosque location only when location is /nearbymosques means useContext is not null */
    isNearByMosquesVisble = true;
  }
  console.log(isNotnull, markers);
  useEffect(() => {
    if (isNotnull === null && markers !== null) {
      removeMultipleMarkers(markers);
      setMarkers(markers);
    }
  }, [isNotnull, markers, setMarkers]);

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
