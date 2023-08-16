import useAddMarkersOnFindPlaces from "../../customHooks/useAddMarkersOnFindPlaces";
import { CircularProgress } from "@mui/material";
import styles from "./findPlacesLayout.module.css";
function FindPlacesLayout() {
  const isMarkersAdded = useAddMarkersOnFindPlaces();

  return (
    <div className={styles.findPlacesLayout}>
      {!isMarkersAdded && (
        <div className={styles.progressBar}>
          <CircularProgress size={50} />
        </div>
      )}
    </div>
  );
}
export default FindPlacesLayout;
