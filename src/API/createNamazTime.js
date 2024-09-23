import axios from "axios";
async function createNamazTime(place_id, namazTimeDetails) {
  const url = `/api/v1/namazTime/${place_id}`;
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
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: err.message,
    };
  }
  // if document found  create successfully
  if (statusCode === 201) {
    return {
      data: createdNamazTimeData.NamazTimeDetails,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: null,
    };
  }
  //if  server error
  if (statusCode === 500) {
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: "Server error",
    };
  }
}
export default createNamazTime;
