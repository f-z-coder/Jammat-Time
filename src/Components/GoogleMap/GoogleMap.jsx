import { useRef, useEffect, useContext } from "react";
import loaderContext from "../../contexts/loaderContext";
import loadMap from "../../Map_function/loadMap";
function GoogleMap({ currentLocation }) {
  const mapref = useRef(null);
  const loader = useContext(loaderContext);
  const mapobj = useRef(null);

  useEffect(() => {
    async function load() {
      if (mapref) {
        mapobj.current = await loadMap(loader, mapref.current);
      }
    }
    load();
  }, [loader]);

  useEffect(() => {
    if (mapobj.current && currentLocation !== null) {
      mapobj.current.panTo(currentLocation);
      mapobj.current.setZoom(10);
    }
  }, [currentLocation]);

  return <div ref={mapref} style={{ width: "100%", height: "100%" }}></div>;
}

export default GoogleMap;
