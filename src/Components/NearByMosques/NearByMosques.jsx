import { useCallback, useContext, useEffect } from "react";
import getNearByMosques from "../../Map_function/getNearByMosques";
import addMultipleMarkers from "../../Map_function/addMultipleMarkers";
import loaderContext from "../../contexts/loaderContext";
import MapContext from "../../contexts/mapContext";
import { useNavigate } from "react-router-dom";
import currentLocationContext from "../../contexts/currentLocation";
import markersContext from "../../contexts/markersContext";
function NearByMosques() {
  const loader = useContext(loaderContext);
  const [map] = useContext(MapContext);
  const [currentLocation] = useContext(currentLocationContext);
  const navigate = useNavigate();
  const [, setMarkers] = useContext(markersContext);

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
          const mosques = await getNearByMosques(loader, map, currentLocation);
          const markers = await addMultipleMarkers(
            loader,
            map,
            mosques,
            showDetails
          );
          map.panTo(currentLocation);
          map.setZoom(15);
          setMarkers(markers);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getAndMarkMosques();
  }, [currentLocation, loader, map, showDetails, setMarkers]);
  return <></>;
}

export default NearByMosques;
