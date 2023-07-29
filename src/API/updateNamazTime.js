import axios from "axios";
async function updateNamazTime(place_id, namazTimeDetails) {
  const base_url = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${base_url}/api/v1/namazTime/${place_id}`;
  const dataToUpdate = { NamazTimeDetails: namazTimeDetails };
  let updatedNamazTimeData = null;
  let statusCode = null;
  let statusMessage = null;
  try {
    ({
      data: updatedNamazTimeData,
      status: statusCode,
      statusText: statusMessage,
    } = await axios.patch(url, dataToUpdate));
  } catch (err) {
    return { error: err.message };
  }
  // if document found  updated successfully
  if (statusCode === 202) {
    return {
      updateNamazTime: updatedNamazTimeData,
      statusCode: statusCode,
      statusMessage: statusMessage,
    };
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    return { error: "server error" };
  }
}
export default updateNamazTime;
