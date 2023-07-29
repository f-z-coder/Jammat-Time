import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import Map from "../../components/map/Map";
import styles from "./rootLayout.module.css";

function RootLayout() {
  const [showMap, setShowMap] = useState(true);
  const { pathname } = useLocation();
  const { place_id } = useParams();
  const navigate = useNavigate();

  const className = showMap ? styles.showMap : styles.hideMap;
  useEffect(() => {
    if (pathname === "/") {
      //just changing url nothing else
      navigate("/map");
    } else if (pathname === `/placesdetails/${place_id}`) {
      setShowMap(false);
    } else {
      setShowMap(true);
    }
  }, [navigate, setShowMap, pathname, place_id]);
  return (
    <div className={styles.rootLayout}>
      <div className={className + " " + styles.map}>
        <Map />
      </div>
      {/* this outlet only usefull for to display placedetails layout  */}
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
