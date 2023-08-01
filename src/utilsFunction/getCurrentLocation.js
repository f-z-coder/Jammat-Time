async function getCurrentLocation() {
  const locationOptions = {
    enableHighAccuracy: false, //gps intense tasks if true and get accurate location
    timeout: 60000, // maxtime to wait for geting location in ms
    maximumAge: 300000, // this is used to get cached location that when timeing for cached is not older than maximum age in ms
    //here we set 300000 means use 5min older location
  };

  let currentLocation = new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // Do something with the location data, e.g. display on a map
          resolve({ lat: lat, lng: lng });
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          reject(error);
        },
        locationOptions
      );
    } else {
      // Geolocation is not supported by the browser
      reject("Geolocation is not supported by this browser.");
    }
  });
  return currentLocation;
}
export default getCurrentLocation;
