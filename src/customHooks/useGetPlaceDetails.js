import { useState, useRef, useEffect, useContext } from "react";
import loaderContext from "../contexts/loaderContext";
import mapContext from "../contexts/mapContext";
import placeDetailsContext from "../contexts/placeDetailsContext";
import getPlaceDetails from "../mapFunction/getPlaceDetails";
function useGetPlaceDetails(place_id) {
  const [placeDetails, setPlaceDetails] = useState({
    photos: null,
    name: "",
    formatted_address: "",
    url: "",
  });
  const isLoaded = useRef(false);
  const loader = useContext(loaderContext);
  const [map] = useContext(mapContext);
  const placeDetailsMap = useContext(placeDetailsContext);
  useEffect(() => {
    async function getDetails() {
      if (placeDetailsMap.has(place_id)) {
        const details = placeDetailsMap.get(place_id);
        setPlaceDetails(details);
        isLoaded.current = true;
      } else {
        try {
          const details = await getPlaceDetails(loader, map, place_id);
          placeDetailsMap.set(place_id, details);
          setPlaceDetails(details);
          isLoaded.current = true;
        } catch (e) {
          console.log(e.message);
        }
      }
    }
    getDetails();
  }, [loader, map, place_id, placeDetailsMap]);
  return { isLoaded: isLoaded.current, placeDetails };
}
export default useGetPlaceDetails;
