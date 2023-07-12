async function addMultipleMarkers(loader, map, places, eventListener) {
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
        eventListener();
      });
    });
  } catch (e) {
    console.log(e);
  }
}
export default addMultipleMarkers;
