import getNearByMosques from "./getNearByMosques";
import addMultipleMarkers from "./addMultipleMarkers";
async function getAndMarkMosques(
  loader,
  map,
  currentLocation,
  nearByMosquesMap,
  markerClickHandler,
  markersDataRef
) {
  if (loader && map && currentLocation && nearByMosquesMap && markersDataRef) {
    const key = currentLocation.lat + " " + currentLocation.lng;
    let mosques = null;
    if (nearByMosquesMap.has(key)) {
      mosques = nearByMosquesMap.get(key);
      console.log("acces previously fetch mosques: ", nearByMosquesMap);
    } else {
      mosques = await getNearByMosques(loader, map, currentLocation);
      nearByMosquesMap.set(key, mosques);
      console.log("fetch mosques new  ", nearByMosquesMap);
    }
    const markers = await addMultipleMarkers(
      loader,
      map,
      mosques,
      markerClickHandler
    );

    map.panTo(currentLocation);
    map.setZoom(15);
    markersDataRef.current = markers;
    console.log("Markers added");
  }
}

export default getAndMarkMosques;
