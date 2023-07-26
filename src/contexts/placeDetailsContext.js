import { createContext } from "react";
const placeDetailsMap = new Map();
const placeDetailsContext = createContext(placeDetailsMap);
export default placeDetailsContext;
