import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Styles from "./searchPlace.module.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { searchQuery: searchvalue } = useParams();
  return (
    <div className={Styles.searchPlace}>
      <TextField
        gap
        className={Styles.textField}
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Find a Masjid"
        InputProps={{
          startAdornment: (
            <>
              {searchvalue && (
                <InputAdornment position="start">
                  <IconButton
                    onClick={async () => {
                      navigate(-1);
                      setSearchQuery("");
                    }}
                  >
                    <ArrowBackOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),

          endAdornment: (
            <>
              {searchQuery.length > 0 && (
                <InputAdornment position="start">
                  <IconButton
                    disabled={searchQuery.length === 0}
                    onClick={async () => {
                      setSearchQuery("");
                    }}
                  >
                    <ClearOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              )}
              <InputAdornment position="end">
                <IconButton
                  disabled={searchQuery.length == 0}
                  onClick={async () => {
                    const url = `/map/findplaces/${searchQuery}`;
                    navigate(url);
                  }}
                >
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      ></TextField>
    </div>
  );
}

export default SearchPlace;
