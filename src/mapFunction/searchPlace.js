async function searchPlace(loader, map, searchQuery) {
  const request = {
    query: searchQuery,
    fields: ["name", "place_id", "types", "geometry"],
    locationBias: "IP_BIAS",
  };
  let places;
  try {
    const { PlacesService } = await loader.importLibrary("places");
    if (map == null) {
      map = document.createElement("div");
    }
    const service = new PlacesService(map);
    places = new Promise((resolve, reject) => {
      service.findPlaceFromQuery(request, (placeResult, status) => {
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
  return places;
}
export default searchPlace;
