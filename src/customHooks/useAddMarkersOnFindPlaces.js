import { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loaderContext from "../contexts/loaderContext";
import mapContext from "../contexts/mapContext";
import nearByMosquesContext from "../contexts/nearByMosquesContext";
import markersContext from "../contexts/markersContext";
import addingMarkersContext from "../contexts/addingMarkers";
import getAndMarkMosques from "../mapFunction/getAndMarkMosques";
import removePreviousMarkers from "../mapFunction/removePreviousMarkers";
import searchPlace from "../mapFunction/searchPlace";

function useAddMarkersOnFindPlaces() {
  const loader = useContext(loaderContext);
  const [map] = useContext(mapContext);
  const nearByMosquesMap = useContext(nearByMosquesContext);
  const navigate = useNavigate();
  const markersDataRef = useContext(markersContext);
  const [isMarkersAdded, setIsMarkersAdded] = useState(false);
  const { searchQuery } = useParams();
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
      const places = await searchPlace(loader, map, searchQuery);
      const place = places[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      await getAndMarkMosques(
        loader,
        map,
        location,
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
    nearByMosquesMap,
    markerClickHandler,
    markersDataRef,
    addingMarkers,
    searchQuery,
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
export default useAddMarkersOnFindPlaces;
