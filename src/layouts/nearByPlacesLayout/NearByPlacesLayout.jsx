import useAddMarkers from "../../customHooks/useAddMarkers";
import BackButton from "../../components/backButton/BackButton";
function NearByPlacesLayout() {
  useAddMarkers();
  return (
    <div>
      <BackButton />
    </div>
  );
}

export default NearByPlacesLayout;
