import styles from "./placeDetails.module.css";
import DirectionsIcon from "@mui/icons-material/Directions";
import useGetPlaceDetails from "../../customHooks/useGetPlaceDetails";
function PlaceDetails({ place_id }) {
  const { photos, name, formatted_address, url } = useGetPlaceDetails(place_id);
  return (
    <div>
      <div className={styles.gallery}>
        {photos?.map((photo) => {
          return (
            <img
              className={styles.mosque_photos}
              key={photo.getUrl()}
              src={photo.getUrl()}
              alt="Mosque Photo"
            />
          );
        })}
      </div>
      <div className={styles.details_section}>
        <div className={styles.name_section}>
          <h1>{name}</h1>
        </div>
        <div className={styles.address_section}>
          <h2>Address :{formatted_address}</h2>

          <button
            className={styles.directionButton}
            onClick={() => {
              window.open(url);
            }}
          >
            <DirectionsIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
