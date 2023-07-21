import Style from "./NamazTime.module.css";
import { Fragment } from "react";
import { useImmer } from "use-immer";
function NamazTime() {
  const timesDefault = [
    {
      Namaz: "Fajar",
      AzanTime: "05:20:00",
      NamazTime: "05:30",
    },
    {
      Namaz: "Zohar",
      AzanTime: "05:20",
      NamazTime: "05:30",
    },
    {
      Namaz: "Asar",
      AzanTime: "05:20",
      NamazTime: "05:30",
    },
    {
      Namaz: "Magrib",
      AzanTime: "05:20",
      NamazTime: "05:30",
    },
    {
      Namaz: "Isha",
      AzanTime: "05:20",
      NamazTime: "05:30",
    },
    {
      Namaz: "Juma",
      AzanTime: "05:20",
      NamazTime: "05:30",
    },
  ];
  const [times, setTime] = useImmer(timesDefault);
  return (
    <div className={Style.time_grid}>
      <div>Prayer</div>
      <div>Azan Time</div>
      <div>Namaz Time</div>
      {times.map((time) => {
        return (
          <Fragment key={time.Namaz}>
            <div>{time.Namaz}</div>
            <div>
              <input
                name={time.Namaz + " AzanTime"}
                type="time"
                value={time.AzanTime}
                onChange={(e) => {
                  const namazName = e.target.name.split(" ")[0];
                  const value = e.target.value;

                  setTime((preTime) => {
                    const Namaz = preTime.find(
                      (element) => element.Namaz === namazName
                    );
                    Namaz["AzanTime"] = value;
                  });
                  e.target.blur();
                }}
              />
            </div>
            <div>
              <input
                name={time.Namaz + " NamazTime"}
                type="time"
                value={time.NamazTime}
                onChange={(e) => {
                  const namazName = e.target.name.split(" ")[0];
                  const value = e.target.value;
                  setTime((preTime) => {
                    const Namaz = preTime.find(
                      (element) => element.Namaz === namazName
                    );
                    Namaz["NamazTime"] = value;
                  });
                  e.target.blur();
                  console.log(time);
                }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default NamazTime;
