import { createContext } from "react";
import loadScript from "../mapFunction/loadScript";
const loader = loadScript(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
const loaderContext = createContext(loader);
export default loaderContext;
