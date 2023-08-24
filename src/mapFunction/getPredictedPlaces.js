async function getPredictedPlaces(loader, searchPlace) {
  const request = {
    input: searchPlace,
    locationBias: "IP_BIAS",
    componentRestrictions: { country: "IN" },
  };
  let predictedPlaces;
  try {
    const { AutocompleteService } = await loader.importLibrary("places");
    const service = new AutocompleteService();
    predictedPlaces = new Promise((resolve, reject) => {
      service.getPlacePredictions(request, (placePredictionsValue, status) => {
        if (status == "OK") {
          resolve(placePredictionsValue);
        } else {
          reject(status);
        }
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
  return predictedPlaces;
}
export default getPredictedPlaces;
