import axios from "axios";
async function createNamazTime(place_id, namazTimeDetails) {
  const base_url = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${base_url}/api/v1/namazTime/${place_id}`;
  const dataToCreate = { NamazTimeDetails: namazTimeDetails };
  let createdNamazTimeData = null;
  let statusCode = null;
  let statusMessage = null;
  try {
    ({
      data: createdNamazTimeData,
      status: statusCode,
      statusText: statusMessage,
    } = await axios.post(url, dataToCreate));
  } catch (err) {
    return { error: err.message };
  }
  // if document found  create successfully
  if (statusCode === 201) {
    return {
      createdNamazTimeData: createdNamazTimeData,
      statusCode: statusCode,
      statusMessage: statusMessage,
    };
  }
  //if  server error
  if (statusCode === 500) {
    return { error: "Server error" };
  }
}
export default createNamazTime;
