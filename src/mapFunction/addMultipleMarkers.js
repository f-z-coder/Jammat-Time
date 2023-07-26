async function addMultipleMarkers(loader, map, places, markerClickHandler) {
  const markers = [];
  try {
    const { Marker } = await loader.importLibrary("marker");
    places?.forEach((place, i) => {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      let marker = new Marker({
        map: map,
        position: position,
        label: i + "",
      });
      marker.addListener("click", () => {
        markerClickHandler(place);
      });
      markers.push(marker);
    });
  } catch (e) {
    console.log(e);
  }
  return markers;
}
export default addMultipleMarkers;
