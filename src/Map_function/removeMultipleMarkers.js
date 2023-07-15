async function removeMultipleMarkers(loader, map, markers) {
  const { event } = await loader.importLibrary("core");
  markers.forEach((marker) => {
    event.clearListeners(marker, "click");
    marker.setMap(null);
    marker.setPosition(null);
    console.log("Removed marker", marker);
  });
  map.setZoom(10);
}
export default removeMultipleMarkers;
