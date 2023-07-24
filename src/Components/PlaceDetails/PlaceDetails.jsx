import { useEffect, useState } from "react";
import styles from "./PlaceDetails.module.css";
import { IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useLocation } from "react-router-dom";
import getPlaceDetails from "../../Map_function/getPlaceDetails";
import loaderContext from "../../contexts/loaderContext";
import MapContext from "../../contexts/mapContext";
import { useContext } from "react";
import NamazTime from "../Namaz_Time/NamazTIme";
function PlaceDetails() {
  const [placeDetails, setPlaceDetails] = useState({
    photos: null,
    name: "faiz",
    formatted_address: "Latur",
    url: "",
  });
  const { pathname } = useLocation();
  const loader = useContext(loaderContext);
  const [map] = useContext(MapContext);
  const place_id = pathname.split("/").pop();

  useEffect(() => {
    async function getDetails() {
      const details = await getPlaceDetails(loader, map, place_id);
      setPlaceDetails(details);
    }
    getDetails();
  }, [loader, map, place_id]);
  const { photos, name, formatted_address, url } = placeDetails;
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
