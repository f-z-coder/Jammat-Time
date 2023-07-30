import removeMultipleMarkers from "./removeMultipleMarkers";
async function removePreviousMarkers(map, markersDataRef) {
  if (markersDataRef.current !== null && map !== null) {
    try {
      await removeMultipleMarkers(markersDataRef.current);
      markersDataRef.current = null;
      map.setZoom(12);
    } catch (err) {
      return err.message;
    }
  }
}
export default removePreviousMarkers;
