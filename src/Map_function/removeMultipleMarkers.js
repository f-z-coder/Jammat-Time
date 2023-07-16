async function removeMultipleMarkers(markers) {
  markers?.forEach((marker) => {
    marker.setMap(null);
    console.log("Removed marker", marker);
  });
}
export default removeMultipleMarkers;
