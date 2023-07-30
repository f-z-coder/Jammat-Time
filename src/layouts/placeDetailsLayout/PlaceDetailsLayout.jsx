import PlaceDetails from "../../components/placeDetails/PlaceDetails";
import BackButton from "../../components/backButton/BackButton";
import styles from "./placeDetailsLayout.module.css";
import { useLocation } from "react-router-dom";
import NamazTime from "../../components/namazTime/NamazTime";
function PlaceDetailsLayout() {
  const { pathname } = useLocation();
  const place_id = pathname.split("/").pop();
  return (
    <div className={styles.placeDetailsLayout}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <PlaceDetails place_id={place_id} />
      <NamazTime place_id={place_id} />
    </div>
  );
}

export default PlaceDetailsLayout;
