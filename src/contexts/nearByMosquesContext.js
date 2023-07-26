import { createContext } from "react";
const nearByMosquesMap = new Map();
const nearByMosquesContext = createContext(nearByMosquesMap);
export default nearByMosquesContext;
