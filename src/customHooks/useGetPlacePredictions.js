import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import predictedPlacesContext from "../contexts/predictedPlacesContext";
import searchQueryContext from "../contexts/searchQueryContext";
import loaderContext from "../contexts/loaderContext";
import getPredictedPlaces from "../mapFunction/getPredictedPlaces";
function useGetPlacePredictions() {
  const [predictedPlaces, setPredictedPlaces] = useContext(
    predictedPlacesContext
  );
  const { searchQuery: searchPlace } = useParams();
  const [searchQuery] = useContext(searchQueryContext);
  const loader = useContext(loaderContext);
  useEffect(() => {
    async function getPrediction() {
      const predictions = await getPredictedPlaces(loader, searchQuery);
      setPredictedPlaces(predictions);
    }
    let requestId = null;
    if (searchQuery.length > 0 && searchQuery !== searchPlace) {
      requestId = setTimeout(getPrediction, 300);
    }
    return () => {
      if (requestId) {
        clearTimeout(requestId);
      }
    };
  }, [loader, searchQuery, searchPlace, setPredictedPlaces]);
  return predictedPlaces;
}
export default useGetPlacePredictions;
