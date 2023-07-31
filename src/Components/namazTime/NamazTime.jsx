import Style from "./NamazTime.module.css";
import { Fragment, useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useImmer } from "use-immer";
import createNamazTime from "../../API/createNamazTime";
import updateNamazTime from "../../API/updateNamazTIme";
import getNamaztime from "../../API/getNamazTime";
import Toast from "../toast/Toast";
function NamazTime({ place_id }) {
  const buttonRef = useRef();
  const [editable, setEditable] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const isDataOnServer = useRef(false);
  const [toastDetails, setToastDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const defaultNamazTimeDetails = [
    {
      Namaz: "Fajar",
      AzanTime: "05:05",
      NamazTime: "05:30",
    },
    {
      Namaz: "Zohar",
      AzanTime: "13:20",
      NamazTime: "13:45",
    },
    {
      Namaz: "Asar",
      AzanTime: "17:10",
      NamazTime: "17:30",
    },
    {
      Namaz: "Magrib",
      AzanTime: "19:06",
      NamazTime: "19:10",
    },
    {
      Namaz: "Isha",
      AzanTime: "20:25",
      NamazTime: "20:45",
    },
    {
      Namaz: "Juma",
      AzanTime: "13:20",
      NamazTime: "14:00",
    },
  ];
  const [namazTime, setNamazTime] = useImmer(defaultNamazTimeDetails);
  const handleClick = async () => {
    if (!editable) {
      setEditable(true);
    } else {
      setEditable(false);
      buttonRef.current.disabled = true;
      setShowProgress(true);
      if (!isDataOnServer.current) {
        const { data, error } = await createNamazTime(place_id, namazTime);
        buttonRef.current.disabled = false;
        setShowProgress(false);
        if (data !== null) {
          setToastDetails({
            open: true,
            message: "Created Successfully",
            severity: "success",
          });
          isDataOnServer.current = true;
        } else {
          setToastDetails({
            open: true,
            message: error,
            severity: "error",
          });
        }
      } else {
        const { data, error } = await updateNamazTime(place_id, namazTime);
        buttonRef.current.disabled = false;
        setShowProgress(false);

        if (data !== null) {
          setToastDetails({
            open: true,
            message: "Updated Successfully",
            severity: "success",
          });
          isDataOnServer.current = true;
        } else {
          setToastDetails({
            open: true,
            message: error,
            severity: "error",
          });
        }
      }
    }
  };
  const handleInputChange = (e) => {
    const namazName = e.target.name.split(" ")[0];
    const azanTimeORNamazTime = e.target.name.split(" ")[1];
    const value = e.target.value;
    setNamazTime((preTime) => {
      const Namaz = preTime.find((element) => element.Namaz === namazName);
      Namaz[azanTimeORNamazTime] = value;
    });
  };

  useEffect(() => {
    async function getNamazTimeData() {
      const { data, error } = await getNamaztime(place_id);

      if (data !== null) {
        isDataOnServer.current = true;
        setNamazTime(data);
      } else if (error === "Document not found") {
        isDataOnServer.current = false;
      } else {
        setToastDetails({
          open: true,
          message: error,
          severity: "error",
        });
      }
    }
    getNamazTimeData();
  }, [place_id, setNamazTime]);

  return (
    <div>
      <Toast toastDetails={toastDetails} />
      <div className={Style.time_grid}>
        <div>Prayer</div>
        <div>Azan Time</div>
        <div>Namaz Time</div>
        {namazTime.map((time) => {
          return (
            <Fragment key={time.Namaz}>
              <div>{time.Namaz}</div>
              <div className={editable ? undefined : Style.disable}>
                <input
                  disabled={!editable}
                  name={time.Namaz + " AzanTime"}
                  type="time"
                  value={time.AzanTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className={editable ? undefined : Style.disable}>
                <input
                  disabled={!editable}
                  name={time.Namaz + " NamazTime"}
                  type="time"
                  value={time.NamazTime}
                  onChange={handleInputChange}
                />
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className={Style.editable_control_section}>
        {!editable && (
          <div>If time is incorrect please Edit it to help other</div>
        )}
        <button
          ref={buttonRef}
          className={editable ? Style.saveButton : Style.editButton}
          onClick={handleClick}
        >
          {editable ? "Save" : "Edit"}
          {showProgress && <CircularProgress size={20} />}
        </button>
      </div>
    </div>
  );
}

export default NamazTime;
