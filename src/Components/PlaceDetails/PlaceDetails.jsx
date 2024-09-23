import styles from "./placeDetails.module.css";
import DirectionsIcon from "@mui/icons-material/Directions";
import useGetPlaceDetails from "../../customHooks/useGetPlaceDetails";
import { Skeleton } from "@mui/material";
function PlaceDetails({ place_id }) {
  const { isLoaded, placeDetails } = useGetPlaceDetails(place_id);
  const { photos, name, formatted_address, url } = placeDetails;
  return (
    <div>
      <div className={styles.gallery}>
        {isLoaded ? (
          photos?.length >= 2 ? (
            photos?.map((photo) => {
              return (
                <img
                  className={styles.mosque_photos}
                  key={photo.getUrl()}
                  src={photo.getUrl()}
                  alt="Mosque Photo"
                />
              );
            })
          ) : photos?.length == 1 ? (
            <>
              <img
                className={styles.mosque_photos}
                key={1}
                src={photos[0].getUrl()}
                alt="Mosque Photo"
              />
              <img
                className={styles.mosque_photos}
                key={2}
                src="/assets/default_Mosque.svg"
                alt="Mosque Photo"
              />
            </>
          ) : (
            <>
              <img
                className={styles.mosque_photos}
                key={1}
                src='/assets/default_Mosque.svg'
                alt="Mosque Photo"
              />
              <img
                className={styles.mosque_photos}
                key={2}
                src='/assets/default_Mosque.svg'
                alt="Mosque Photo"
              />
            </>
          )
        ) : (
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        )}
      </div>
      <div className={styles.details_section}>
        <div className={styles.name_section}>
          {isLoaded ? (
            <h1>{name}</h1>
          ) : (
            <Skeleton variant="text" width={"100%"} height={"100%"} />
          )}
        </div>
        <div className={styles.address_section}>
          <div className={styles.address}>
            {isLoaded ? (
              <h2>Address :{formatted_address}</h2>
            ) : (
              <Skeleton variant="text" width={"100%"} height={"100%"} />
            )}
          </div>
          <div className={styles.direction}>
            {isLoaded ? (
              <button
                className={styles.directionButton}
                onClick={() => {
                  window.open(url);
                }}
              >
                <DirectionsIcon />
              </button>
            ) : (
              <Skeleton variant="circular" width={"100%"} height={"100%"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
