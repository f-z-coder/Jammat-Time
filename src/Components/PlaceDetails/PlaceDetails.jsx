import styles from "./placeDetails.module.css";
import { IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useLocation } from "react-router-dom";

import NamazTime from "../namazTime/NamazTime";
import useGetPlaceDetails from "../../customHooks/useGetPlaceDetails";
function PlaceDetails() {
  const { pathname } = useLocation();
  const place_id = pathname.split("/").pop();

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
          <IconButton
            fontSize="60"
            sx={{ color: "var(--clr-accent-500)" }}
            onClick={() => {
              window.open(url);
            }}
          >
            <DirectionsIcon />
          </IconButton>
        </div>
      </div>

      <NamazTime place_id={place_id} />
    </div>
  );
}

export default PlaceDetails;
