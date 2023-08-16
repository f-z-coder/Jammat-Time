import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Styles from "./searchPlace.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div className={Styles.searchPlace}>
      <TextField
        className={Styles.textField}
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Find a Masjid"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={async () => {
                  const url = `/map/findplaces/${searchQuery}`;
                  navigate(url);
                }}
              >
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
}

export default SearchPlace;
