import axios from "axios";
async function updateNamazTime(place_id, namazTimeDetails) {
  const url = `http://localhost:80/api/v1/namazTime/${place_id}`;
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
    console.log(updatedNamazTimeData, statusCode, statusMessage);
  } catch (err) {
    console.log(err);
  }
  // if document found  updated successfully
  if (statusCode === 202) {
    return statusMessage;
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    console.error(updatedNamazTimeData.Error);
    return null;
  }
}
export default updateNamazTime;
