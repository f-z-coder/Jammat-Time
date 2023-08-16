import { Outlet } from "react-router-dom";
import SearchPlace from "../../components/searchPlace/SearchPlace";
//this layout  use just to sync  patth and layout and to get oulet from /map/nearbyplace
function MapLayout() {
  return (
    <div>
      <SearchPlace />
      <Outlet />
    </div>
  );
}

export default MapLayout;
