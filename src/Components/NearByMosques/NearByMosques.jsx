import { useCallback, useContext, useEffect } from "react";
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
  const [markersState, setMarkersState] = useContext(markersContext);
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
        if (map && loader && currentLocation) {
          if (markersState !== null) {
            //this is cleanup  to remove markers before adding new markers
            await removeMultipleMarkers(markersState);
            setMarkersState(null);
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
          setMarkersState(markers);
          console.log("Markers added");
        }
      } catch (e) {
        console.error(e);
      }
    }
    getAndMarkMosques();
  }, [
    loader,
    map,
    currentLocation,
    showDetails,
    markersState,
    setMarkersState,
  ]);

  return <></>;
}

export default NearByMosques;
