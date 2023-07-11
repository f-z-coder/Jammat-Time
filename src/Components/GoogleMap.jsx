import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function loadScript(apiKey, otheroptions = {}) {
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    region: "IN",
    libraries: ["places"],
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
    disableDefaultUI: true,
    scrollwheel: false,
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

async function getPlaceDetails(place_id) {
  let request = {
    placeId: place_id,
    fields: ["name", "formatted_address", "photos", "type", "url"],
  };
  const { PlacesService } = await loader.importLibrary("places");
  const service = new PlacesService(map);
  const placeDetails = new Promise((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status == "OK") {
        resolve(place);
        console.log(place, status);
      } else {
        reject(status);
      }
    });
  });

  return placeDetails;
}

async function addMultipleMarkers(map, places, setPlaceID) {
  try {
    const { Marker } = await loader.importLibrary("marker");
    places.forEach((place, i) => {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      let marker = new Marker({
        map: map,
        position: position,
        label: i + "",
      });
      marker.addListener("click", () => {
        console.log(place.place_id);
        setPlaceID(place.place_id);
      });
    });
  } catch (e) {
    console.log(e);
  }
}
async function mosqueNearMe(currentlocation) {
  const request = {
    location: currentlocation,
    radius: "10000", //10km
    type: "mosque",
  };
  const { PlacesService } = await loader.importLibrary("places");
  const service = new PlacesService(map);
  const mosques = new Promise((resolve, reject) => {
    service.nearbySearch(request, (places, placesstatus) => {
      if (placesstatus == "OK") {
        console.log(places, placesstatus);
        resolve(places);
      } else {
        reject(placesstatus);
      }
    });
  });
  return mosques;
}

function GoogleMap({ currentPosition, setPlaceDetails }) {
  const mapref = useRef(null);
  const [placeId, setPlaceID] = useState(null);

  useEffect(() => {
    loadMap(loader, mapref.current, { lat: 18.408792, lng: 76.560387 }, 10);
    console.log("map efffext");
  }, []);
  useEffect(() => {
    async function markAllMosque() {
      if (map) {
        map.panTo(currentPosition);
        map.setZoom(15);
        const mosques = await mosqueNearMe(currentPosition);
        addMultipleMarkers(map, mosques, setPlaceID);
      }
    }
    markAllMosque();
  }, [currentPosition]);
  useEffect(() => {
    async function displayPlace() {
      if (placeId) {
        const placeDetails = await getPlaceDetails(placeId);
        setPlaceDetails(placeDetails);
      }
    }
    displayPlace();
  }, [placeId]);
  return <div ref={mapref} style={{ width: "100%", height: "600px" }}></div>;
}

export default GoogleMap;
