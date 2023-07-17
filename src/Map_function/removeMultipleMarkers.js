async function removeMultipleMarkers(markers) {
  markers?.forEach((marker) => {
    marker.setMap(null);
  });
}
export default removeMultipleMarkers;
