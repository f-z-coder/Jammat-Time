import axios from "axios";
async function createNamazTime(place_id, namazTimeDetails) {
  const url = `http://localhost:80/api/v1/namazTime/${place_id}`;
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
    console.log(createdNamazTimeData, statusCode, statusMessage);
  } catch (err) {
    console.log(err);
  }
  // if document found  create successfully
  if (statusCode === 201) {
    return statusMessage;
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    console.error(createdNamazTimeData.Error);
    return null;
  }
}
export default createNamazTime;
