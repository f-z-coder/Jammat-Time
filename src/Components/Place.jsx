import styles from "./Place.module.css";
function Place({ placeDetails }) {
  const { name, formatted_address, types, url, photos } = placeDetails;
  console.log(name, formatted_address, types, url, photos);
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

export default Place;
