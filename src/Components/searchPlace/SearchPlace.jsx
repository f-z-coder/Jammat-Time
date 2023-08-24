import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Styles from "./searchPlace.module.css";
import { useContext } from "react";
import searchQueryContext from "../../contexts/searchQueryContext";
import predictedPlacesContext from "../../contexts/predictedPlacesContext";
import { useLocation, useNavigate } from "react-router-dom";
function SearchPlace() {
  const [searchQuery, setSearchQuery] = useContext(searchQueryContext);
  const [, setPlacePredictionValue] = useContext(predictedPlacesContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBackButton = pathname !== "/map";
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
        placeholder="Search in Area..."
        InputProps={{
          startAdornment: (
            <>
              {showBackButton && (
                <InputAdornment position="start">
                  <IconButton
                    sx={{ paddingRight: 2 }}
                    onClick={async () => {
                      navigate("/map");
                      setPlacePredictionValue([]);
                      if (searchQuery !== "") {
                        setSearchQuery("");
                      }
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
                    onClick={async () => {
                      setSearchQuery("");
                      setPlacePredictionValue([]);
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
                    setPlacePredictionValue([]);
                    if (pathname !== url) {
                      navigate(url);
                    }
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
