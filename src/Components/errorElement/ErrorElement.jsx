import styles from "./errorElement.module.css";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function ErrorElement() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBox}>
        <svg className={styles.errorIcon} viewBox="0 0 24 24">
          {/* Your custom error icon SVG */}
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-1-15h2v8h-2zm0 10h2v2h-2z" />
        </svg>
        <p className={styles.errorMessage}>{error.message}</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className={styles.errorButon}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorElement;
