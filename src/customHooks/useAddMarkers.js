import { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loaderContext from "../contexts/loaderContext";
import mapContext from "../contexts/mapContext";
import currentLocationContext from "../contexts/currentLocation";
import nearByMosquesContext from "../contexts/nearByMosquesContext";
import markersContext from "../contexts/markersContext";
import addingMarkersContext from "../contexts/addingMarkers";
import getAndMarkMosques from "../mapFunction/getAndMarkMosques";
import removePreviousMarkers from "../mapFunction/removePreviousMarkers";

function useAddMarkers() {
  const loader = useContext(loaderContext);
  const [map] = useContext(mapContext);
  const [currentLocation] = useContext(currentLocationContext);
  const nearByMosquesMap = useContext(nearByMosquesContext);
  const navigate = useNavigate();
  const markersDataRef = useContext(markersContext);
  //this flag to check marker adding is in progress or not for presistent of this flag while rendering (note :Not re-rendering) multiple time we use context provided app not local useref because it not presist during rendering
  const addingMarkers = useContext(addingMarkersContext);

  //marker click handler
  const markerClickHandler = useCallback(
    (mosque) => {
      const url = `/placesdetails/${mosque.place_id}`;
      navigate(url);
    },
    [navigate]
  );
  //adding marker synchronization with removing
  const addMarkers = useCallback(async () => {
    console.log("before adding ", addingMarkers.current);
    if (addingMarkers.current == false) {
      addingMarkers.current = true;
      console.log("btw,", addingMarkers.current);
      console.log("adding marker synchronization");
      await getAndMarkMosques(
        loader,
        map,
        currentLocation,
        nearByMosquesMap,
        markerClickHandler,
        markersDataRef
      );
      addingMarkers.current = false;
      console.log("after adding,", addingMarkers.current);
    }
  }, [
    loader,
    map,
    currentLocation,
    nearByMosquesMap,
    markerClickHandler,
    markersDataRef,
    addingMarkers,
  ]);

  //clean up functions for removing added markers
  const removeMarkers = useCallback(async () => {
    console.log("before removing", addingMarkers.current);
    if (addingMarkers.current === false) {
      await removePreviousMarkers(map, markersDataRef);
      console.log("after removeing", addingMarkers.current);
    }
  }, [map, markersDataRef, addingMarkers]);

  useEffect(() => {
    //adding markers
    addMarkers();

    //clean up functions for removing added markers
    return removeMarkers;
  }, [addMarkers, removeMarkers]);
}
export default useAddMarkers;
