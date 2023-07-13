import { useEffect, useState } from "react";
import styles from "./PlaceDetails.module.css";
import { useLocation } from "react-router-dom";
import getPlaceDetails from "../../Map_function/getPlaceDetails";
import loaderContext from "../../contexts/loaderContext";
import MapContext from "../../contexts/mapContext";
import { useContext } from "react";
function PlaceDetails() {
  const [placeDetails, setPlaceDetails] = useState({
    name: "faiz",
    formatted_address: "Latur",
    types: "dev",
    url: "",
    photos: null,
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
  const { name, formatted_address, types, url, photos } = placeDetails;
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
      <div className={styles.detail_section}>
        <h1>{name}</h1>
        <h2>{types[0]}</h2>
      </div>
      <div className="Time">
        <button> View Time</button>
      </div>
      <div className={styles.address_section}>
        <a href={url}>{formatted_address}</a>
      </div>
    </div>
  );
}

export default PlaceDetails;
