async function getNearByMosques(loader, map, currentlocation) {
  const request = {
    location: currentlocation,
    radius: "10000", //10km
    type: "mosque",
  };
  let mosques;
  try {
    const { PlacesService } = await loader.importLibrary("places");
    const service = new PlacesService(map);
    mosques = new Promise((resolve, reject) => {
      service.nearbySearch(request, (placeResult, status) => {
        if (status == "OK") {
          resolve(placeResult);
        } else {
          reject(status);
        }
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
  return mosques;
}
export default getNearByMosques;
