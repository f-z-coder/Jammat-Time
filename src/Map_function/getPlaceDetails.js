async function getPlaceDetails(loader, map, place_id) {
  let request = {
    placeId: place_id,
    fields: ["name", "formatted_address", "photos", "type", "url"],
  };
  let placeDetails;
  try {
    const { PlacesService, PlacesServiceStatus } = await loader.importLibrary(
      "places"
    );
    const service = new PlacesService(map);
    placeDetails = new Promise((resolve, reject) => {
      service.getDetails(request, (placeResult, status) => {
        if (status == PlacesServiceStatus.OK) {
          resolve(placeResult);
        } else {
          reject(status);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
  return placeDetails;
}
export default getPlaceDetails;
