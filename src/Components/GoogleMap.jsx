import { useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function loadScript(apiKey, otheroptions = {}) {
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    ...otheroptions,
  });
  return loader;
}
const loader = loadScript(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
let map = null;
async function loadMap(loader, mapref, center, zoom) {
  const mapOptions = {
    center,
    zoom,
    mapId: "DEMO_MAP_ID",
  };
  try {
    const maplibrary = await loader.importLibrary("maps");
    map = new maplibrary.Map(mapref, mapOptions);
    console.log("loaded map");
  } catch (e) {
    console.log(e);
  }
}
async function AddMarker(map, position) {
  try {
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
    });
    console.log("marker add");
  } catch (e) {
    console.log(e);
  }
}

function GoogleMap({ currentPosition }) {
  const mapref = useRef(null);

  useEffect(() => {
    loadMap(loader, mapref.current, { lat: 18.408792, lng: 76.560387 }, 10);
  }, []);
  useEffect(() => {
    if (map) {
      map.panTo(currentPosition);
      map.setZoom(15);
      AddMarker(map, currentPosition);
    }
  }, [currentPosition]);
  return <div style={{ width: "100vw", height: "60vh" }} ref={mapref}></div>;
}

export default GoogleMap;
