import { useContext, useEffect, useCallback, useState } from "react";
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
  const [isMarkersAdded, setIsMarkersAdded] = useState(false);
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
    if (addingMarkers.current == false) {
      addingMarkers.current = true;

      await getAndMarkMosques(
        loader,
        map,
        currentLocation,
        nearByMosquesMap,
        markerClickHandler,
        markersDataRef
      );
      setIsMarkersAdded(true);
      addingMarkers.current = false;
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
    if (addingMarkers.current === false) {
      await removePreviousMarkers(map, markersDataRef);
    }
  }, [map, markersDataRef, addingMarkers]);

  useEffect(() => {
    //adding markers
    addMarkers();

    //clean up functions for removing added markers
    return removeMarkers;
  }, [addMarkers, removeMarkers]);

  return isMarkersAdded;
}
export default useAddMarkers;
