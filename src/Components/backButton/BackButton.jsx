import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./backButton.module.css";
import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  const handleBackButttonClick = () => {
    navigate(-1);
  };
  return (
    <button onClick={handleBackButttonClick} className={styles.backButton}>
      <ArrowBackIcon />
    </button>
  );
}

export default BackButton;
