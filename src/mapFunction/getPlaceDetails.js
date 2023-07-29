async function getPlaceDetails(loader, map, place_id) {
  let request = {
    placeId: place_id,
    fields: ["name", "formatted_address", "photos", "url"],
  };
  let placeDetails;
  try {
    const { PlacesService } = await loader.importLibrary("places");
    const service = new PlacesService(map);
    placeDetails = new Promise((resolve, reject) => {
      service.getDetails(request, (placeResult, status) => {
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
  return placeDetails;
}
export default getPlaceDetails;
