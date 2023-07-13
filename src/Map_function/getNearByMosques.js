async function getNearByMosques(loader, map, currentlocation) {
  if (loader == null || map == null || currentlocation == null) {
    return null;
  }
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
    console.log(err);
  }
  return mosques;
}
export default getNearByMosques;
