import axios from "axios";
async function updateNamazTime(place_id, namazTimeDetails) {
  const url = `/api/v1/namazTime/${place_id}`;
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
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: err.message,
    };
  }
  // if document found  updated successfully
  if (statusCode === 202) {
    return {
      data: updatedNamazTimeData.NamazTimeDetails,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: null,
    };
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: "server error",
    };
  }
}
export default updateNamazTime;
