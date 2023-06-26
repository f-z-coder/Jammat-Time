import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { LocationOnRounded } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      components: "country:in",
    },

    debounce: 600,
  });
  // console.log("status", status);
  // console.log("data", data);
  // console.log("VALue", value);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "5rem",
          padding: ".5rem",
          borderRadius: ".5rem",
        }}
      >
        <TextField
          disabled={!ready}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Find a Masjid"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>
      {status === "OK" &&
        data.map((suggestion) => {
          return (
            <List key={suggestion.place_id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setValue(suggestion.description, false);
                    getGeocode({ address: suggestion.description }).then(
                      (results) => {
                        const { lat, lng } = getLatLng(results[0]);
                      }
                    );
                    clearSuggestions();
                  }}
                >
                  <ListItemIcon>
                    <LocationOnRounded />
                  </ListItemIcon>
                  <ListItemText primary={suggestion.description} />
                </ListItemButton>
                <Divider />
              </ListItem>
            </List>
          );
        })}
    </>
  );
}
export default Search;
