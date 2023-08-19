import { Outlet } from "react-router-dom";
import SearchPlace from "../../components/searchPlace/SearchPlace";
import styles from "./mapLayout.module.css";
//this layout  use just to sync  patth and layout and to get oulet from /map/nearbyplace
function MapLayout() {
  return (
    <div className={styles.mapLayout}>
      <div className={styles.searchPlace}>
        <SearchPlace />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MapLayout;
