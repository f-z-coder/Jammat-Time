import { Loader } from "@googlemaps/js-api-loader";
function loadScript(apiKey) {
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    region: "IN",
    libraries: ["places"],
  });
  return loader;
}
export default loadScript;
