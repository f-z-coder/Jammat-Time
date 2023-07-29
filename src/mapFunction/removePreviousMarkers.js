import removeMultipleMarkers from "./removeMultipleMarkers";
async function removePreviousMarkers(map, markersDataRef) {
  if (markersDataRef.current !== null && map !== null) {
    await removeMultipleMarkers(markersDataRef.current);
    markersDataRef.current = null;
    map.setZoom(12);
  }
}
export default removePreviousMarkers;
