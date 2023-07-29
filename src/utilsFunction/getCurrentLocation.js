async function getCurrentLocation() {
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
        { enableHighAccuracy: true }
      );
    } else {
      // Geolocation is not supported by the browser
      reject("Geolocation is not supported by this browser.");
    }
  });
  return currentLocation;
}
export default getCurrentLocation;
