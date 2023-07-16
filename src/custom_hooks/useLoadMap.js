import { useEffect, useContext } from "react";
import loaderContext from "../contexts/loaderContext";
import MapContext from "../contexts/mapContext";
import loadMap from "../Map_function/loadMap";
function useLoadMap(mapContainerElementRef) {
  const [map, setMap] = useContext(MapContext);
  const loader = useContext(loaderContext);
  useEffect(() => {
    async function load() {
      if (mapContainerElementRef) {
        const mapobj = await loadMap(loader, mapContainerElementRef.current);
        setMap(mapobj);
        console.log("map loaded");
      }
    }
    load();
  }, [loader, mapContainerElementRef, setMap]);
  return map;
}
export default useLoadMap;
