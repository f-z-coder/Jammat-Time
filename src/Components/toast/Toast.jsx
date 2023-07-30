import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
function Toast({ toastDetails }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (toastDetails.open == true) {
      setOpen(true);
    }
  }, [toastDetails]);
  return (
    <Snackbar
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => {
          setOpen(false);
        }}
        style={{ width: "250px" }}
        severity={toastDetails.severity}
      >
        {toastDetails.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
