import { useCallback, useContext, useEffect, useRef } from "react";
import getNearByMosques from "../../Map_function/getNearByMosques";
import addMultipleMarkers from "../../Map_function/addMultipleMarkers";
import loaderContext from "../../contexts/loaderContext";
import MapContext from "../../contexts/mapContext";
import { useNavigate } from "react-router-dom";
import currentLocationContext from "../../contexts/currentLocation";
import markersContext from "../../contexts/markersContext";
import removeMultipleMarkers from "../../Map_function/removeMultipleMarkers";
function NearByMosques() {
  const loader = useContext(loaderContext);
  const [map] = useContext(MapContext);
  const [currentLocation] = useContext(currentLocationContext);
  const navigate = useNavigate();
  const markersDataRef = useContext(markersContext);
  const isEffectRunning = useRef(false);
  const showDetails = useCallback(
    (mosque) => {
      const url = `/placesdetails/${mosque.place_id}`;
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    async function getAndMarkMosques() {
      try {
        if (map && loader && currentLocation && !isEffectRunning.current) {
          isEffectRunning.current = true;

          console.log("Removing marker", markersDataRef.current);
          if (markersDataRef.current !== null) {
            // This is cleanup to remove markers before adding new markers
            await removeMultipleMarkers(markersDataRef.current);
            markersDataRef.current = null;
            console.log("removePreviousMarker");
          }

          const mosques = await getNearByMosques(loader, map, currentLocation);
          const markers = await addMultipleMarkers(
            loader,
            map,
            mosques,
            showDetails
          );

          map.panTo(currentLocation);
          map.setZoom(15);
          markersDataRef.current = markers;
          console.log("Markers added");

          isEffectRunning.current = false;
        } else {
          console.log("curent isEffectRunning");
          setTimeout(getAndMarkMosques, 200);
        }
      } catch (e) {
        isEffectRunning.current = false;
        console.error(e);
      }
    }

    getAndMarkMosques();
  }, [loader, map, currentLocation, showDetails, markersDataRef]);

  return <></>;
}

export default NearByMosques;
