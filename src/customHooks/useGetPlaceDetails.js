import { useState, useEffect, useContext } from "react";
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
  const loader = useContext(loaderContext);
  const [map] = useContext(mapContext);
  const placeDetailsMap = useContext(placeDetailsContext);
  useEffect(() => {
    async function getDetails() {
      if (placeDetailsMap.has(place_id)) {
        const details = placeDetailsMap.get(place_id);
        setPlaceDetails(details);
      } else {
        const details = await getPlaceDetails(loader, map, place_id);
        placeDetailsMap.set(place_id, details);
        setPlaceDetails(details);
      }
    }
    getDetails();
  }, [loader, map, place_id, placeDetailsMap]);
  return placeDetails;
}
export default useGetPlaceDetails;
