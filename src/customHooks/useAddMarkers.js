import { useContext, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loaderContext from "../contexts/loaderContext";
import mapContext from "../contexts/mapContext";
import currentLocationContext from "../contexts/currentLocation";
import nearByMosquesContext from "../contexts/nearByMosquesContext";
import markersContext from "../contexts/markersContext";
import getAndMarkMosques from "../mapFunction/getAndMarkMosques";
import removePreviousMarkers from "../mapFunction/removePreviousMarkers";

function useAddMarkers() {
  const loader = useContext(loaderContext);
  const [map] = useContext(mapContext);
  const [currentLocation] = useContext(currentLocationContext);
  const nearByMosquesMap = useContext(nearByMosquesContext);
  const navigate = useNavigate();
  const markersDataRef = useContext(markersContext);
  const addingMarkers = useRef(false);

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
      addingMarkers.current = false;
    }
  }, [
    loader,
    map,
    currentLocation,
    nearByMosquesMap,
    markerClickHandler,
    markersDataRef,
  ]);

  //clean up functions for removing added markers
  const removeMarkers = useCallback(async () => {
    if (addingMarkers.current === false) {
      await removePreviousMarkers(map, markersDataRef);
    }
  }, [map, markersDataRef]);

  useEffect(() => {
    //adding markers
    addMarkers();

    //clean up functions for removing added markers
    return removeMarkers;
  }, [addMarkers, removeMarkers]);
}
export default useAddMarkers;
