import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useParams,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import MapLayout from "../mapLayout/MapLayout";
import styles from "./rootLayout.module.css";

function RootLayout() {
  const [showMapLayOut, setShowMapLayOut] = useState(true);
  const { pathname } = useLocation();
  const { place_id } = useParams();
  const navigate = useNavigate();

  const className = showMapLayOut ? styles.showMapLayOut : styles.hideMapLayOut;
  const oulet = useOutlet();
  console.log("RootLayout render", oulet);

  useEffect(() => {
    if (pathname === "/") {
      //just changing url nothing else
      navigate("/map");
    } else if (pathname === `/placesdetails/${place_id}`) {
      setShowMapLayOut(false);
    } else {
      setShowMapLayOut(true);
    }
  }, [navigate, setShowMapLayOut, pathname, place_id]);
  return (
    <div>
      <div className={className}>
        <MapLayout />
      </div>
      {/* this outlet only usefull for to display placedetails layout  */}
      <Outlet />
    </div>
  );
}

export default RootLayout;
