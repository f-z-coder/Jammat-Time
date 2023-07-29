import Style from "./NamazTime.module.css";
import { Fragment, useState, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import createNamazTime from "../../API/createNamazTime";
import updateNamazTime from "../../API/updateNamazTIme";
import getNamaztime from "../../API/getNamazTime";
function NamazTime({ place_id }) {
  const [editable, setEditable] = useState(false);
  const isDataOnServer = useRef(true);

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

  useEffect(() => {
    async function getNamazTimeData() {
      const namazTimeData = await getNamaztime(place_id);
      if (!namazTimeData.error) {
        if (namazTimeData == null) {
          isDataOnServer.current = false;
        } else {
          setNamazTime(namazTimeData);
        }
      }
    }
    getNamazTimeData();
  }, [place_id, setNamazTime]);

  return (
    <div>
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
                  name={time.Namaz + " AzanTime"}
                  type="time"
                  value={time.AzanTime}
                  onChange={(e) => {
                    const namazName = e.target.name.split(" ")[0];
                    const value = e.target.value;

                    setNamazTime((preTime) => {
                      const Namaz = preTime.find(
                        (element) => element.Namaz === namazName
                      );
                      Namaz["AzanTime"] = value;
                    });
                    // e.target.blur();
                  }}
                />
              </div>
              <div className={editable ? undefined : Style.disable}>
                <input
                  name={time.Namaz + " NamazTime"}
                  type="time"
                  value={time.NamazTime}
                  onChange={(e) => {
                    const namazName = e.target.name.split(" ")[0];
                    const value = e.target.value;
                    setNamazTime((preTime) => {
                      const Namaz = preTime.find(
                        (element) => element.Namaz === namazName
                      );
                      Namaz["NamazTime"] = value;
                    });
                    // e.target.blur();
                    console.log(time);
                  }}
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
          className={editable ? Style.saveButton : Style.editButton}
          onClick={() => {
            if (!editable) {
              setEditable(true);
            } else {
              setEditable(false);
              if (!isDataOnServer.current) {
                createNamazTime(place_id, namazTime);
                isDataOnServer.current = true;
              } else {
                updateNamazTime(place_id, namazTime);
              }
            }
          }}
        >
          {editable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default NamazTime;
