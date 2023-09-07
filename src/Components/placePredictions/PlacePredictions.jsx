import predictedPlacesContext from "../../contexts/predictedPlacesContext";
import searchQueryContext from "../../contexts/searchQueryContext";
import { useContext } from "react";
import styles from "./placePrediction.module.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useLocation, useNavigate } from "react-router-dom";
function PlacePredictions() {
  const [placePredictionsValue, setplacePredictionsValue] = useContext(
    predictedPlacesContext
  );
  const { pathname } = useLocation();
  const nagivate = useNavigate();
  const [, setSearchQuery] = useContext(searchQueryContext);

  return (
    <div className={styles.placePredictions}>
      {placePredictionsValue.map((placePrediction, i) => {
        return (
          <div
            onClick={() => {
              const isMosque = placePrediction.types.includes("mosque");
              const placeSearch =
                placePrediction.structured_formatting.main_text +
                " " +
                placePrediction.structured_formatting.secondary_text;
              setplacePredictionsValue([]);
              setSearchQuery(placeSearch);
              if (isMosque) {
                nagivate(`/placesdetails/${placePrediction.place_id}`);
              } else if (pathname === "/map") {
                nagivate(`/map/findplaces/${placeSearch}`);
              } else {
                nagivate(`/map/findplaces/${placeSearch}`, { replace: true });
              }
            }}
            className={styles.listItem}
            key={i}
          >
            <div className={styles.locationIcon}>
              <PlaceOutlinedIcon />
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemMainText}>
                {placePrediction.structured_formatting.main_text}
              </div>
              <div className={styles.itemSecondaryText}>
                {placePrediction.structured_formatting.secondary_text.substring(
                  0,
                  50
                )}
                {placePrediction.structured_formatting.secondary_text.length >
                  50 && "..."}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlacePredictions;
