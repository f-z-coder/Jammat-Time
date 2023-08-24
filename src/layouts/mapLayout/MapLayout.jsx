import { Outlet } from "react-router-dom";
import SearchPlace from "../../components/searchPlace/SearchPlace";
import PlacePredictions from "../../components/placePredictions/PlacePredictions";
import useGetPlacePredictions from "../../customHooks/useGetPlacePredictions";
import styles from "./mapLayout.module.css";

function MapLayout() {
  const predictedPlaces = useGetPlacePredictions();
  return (
    <div className={styles.mapLayout}>
      <div className={styles.searchWrapper}>
        <SearchPlace />
        {predictedPlaces.length > 0 && <PlacePredictions />}
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MapLayout;
