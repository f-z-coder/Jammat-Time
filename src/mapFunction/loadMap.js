async function loadMap(loader, mapContainerElement) {
  const mapOptions = {
    center: {
      lat: 18.408792,
      lng: 76.560387,
    },
    zoom: 12,
    disableDefaultUI: true,
    mapId: "DEMO_MAP_ID",
  };
  let map;
  try {
    const { Map } = await loader.importLibrary("maps");
    map = new Map(mapContainerElement, mapOptions);
  } catch (e) {
    throw new Error(e.message);
  }
  return map;
}
export default loadMap;
