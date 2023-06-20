import Map from "./Map";
import Search from "./Search";
import { useJsApiLoader } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
const libraries = ["places"];

function App() {
  const { isLoaded, errorToLoad } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <Grid sx={{ height: "100vh" }} container>
      <Grid item xs={12}>
        {isLoaded && <Search />}
      </Grid>
      <Grid item xs={12}>
        <Map isLoaded={isLoaded} errorToLoad={errorToLoad} />
      </Grid>
    </Grid>
  );
}

export default App;
